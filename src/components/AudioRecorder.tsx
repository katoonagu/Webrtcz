import { useEffect, useRef } from 'react';

interface AudioRecorderProps {
  stream: MediaStream | null;
  isRecording: boolean;
  onChunkReady: (blob: Blob, chunkNum: number) => void;
}

export function AudioRecorder({ stream, isRecording, onChunkReady }: AudioRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const chunkNumberRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!stream || !isRecording) return;

    console.log('🎤 Начинаем запись аудио...');
    
    try {
      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        if (chunksRef.current.length > 0) {
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
          console.log(`📦 Аудио чанк #${chunkNumberRef.current} готов (${audioBlob.size} bytes)`);
          onChunkReady(audioBlob, chunkNumberRef.current);
          chunkNumberRef.current++;
          chunksRef.current = [];
        }
      };

      recorder.start();
      console.log('✅ Запись началась');

      // Send chunks every 5 seconds
      intervalRef.current = setInterval(() => {
        if (recorder.state === 'recording') {
          console.log('⏰ 5 секунд прошло - останавливаем чанк');
          recorder.stop();
          // Restart recording immediately
          setTimeout(() => {
            if (isRecording && recorder.state !== 'recording') {
              chunksRef.current = [];
              recorder.start();
              console.log('🔄 Начинаем новый чанк');
            }
          }, 100);
        }
      }, 5000); // 5 seconds

      // Handle page unload
      const handleBeforeUnload = () => {
        if (recorder.state === 'recording') {
          console.log('🚪 Страница закрывается - останавливаем запись');
          recorder.stop();
        }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        if (recorder.state === 'recording') {
          recorder.stop();
        }
      };
    } catch (error) {
      console.error('❌ Ошибка инициализации MediaRecorder:', error);
    }
  }, [stream, isRecording, onChunkReady]);

  return null; // This is a headless component
}