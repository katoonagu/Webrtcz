# 🚨 Решение проблемы с iframe разрешениями

## Проблема

Если приложение работает внутри `<iframe>` (например, в Figma Make), браузеры **блокируют доступ** к:
- 📍 Геолокации (GPS)
- 📷 Камере
- 🎤 Микрофону

По умолчанию без специальных атрибутов.

## ✅ Решение

### Для Chrome/Edge/Firefox:
```html
<iframe 
  src="https://your-app.com" 
  allow="geolocation; camera; microphone"
  width="100%" 
  height="100%"
></iframe>
```

### Для Safari (iOS/macOS):
```html
<iframe 
  src="https://your-app.com" 
  allow="geolocation *; camera *; microphone *"
  width="100%" 
  height="100%"
></iframe>
```

**Примечание:** Safari требует `*` после каждого разрешения!

### Универсальный вариант (работает везде):
```html
<iframe 
  src="https://your-app.com" 
  allow="geolocation *; camera *; microphone *; notifications *"
  sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
  width="100%" 
  height="100%"
></iframe>
```

## 🔧 Дополнительные разрешения

```html
allow="
  geolocation *;
  camera *;
  microphone *;
  notifications *;
  display-capture *;
  accelerometer *;
  gyroscope *;
"
```

## 🧪 Проверка в коде

Приложение автоматически детектирует проблему:

```typescript
// В App.tsx уже реализовано:
const checkIframePermissions = (): string | null => {
  const inIframe = window.self !== window.top;
  if (!inIframe) return null;

  const policy = document.featurePolicy || document.permissionsPolicy;
  if (policy) {
    const geoAllowed = policy.allowsFeature?.('geolocation');
    const camAllowed = policy.allowsFeature?.('camera');
    const micAllowed = policy.allowsFeature?.('microphone');
    
    if (!geoAllowed || !camAllowed || !micAllowed) {
      return 'IFRAME PERMISSIONS BLOCKED!';
    }
  }
  
  return null;
};
```

## 📱 Особенности платформ

### iOS Safari
- Требует `allow="geolocation *; camera *; microphone *"` с `*`
- Пользователь должен вручную включить GPS в **Настройки → Конфиденциальность → Службы геолокации**

### Android Chrome
- Работает с `allow="geolocation; camera; microphone"`
- Режим "Высокая точность" для GPS: **Настройки → Местоположение**

### Desktop Chrome/Edge/Firefox
- Стандартный синтаксис `allow="geolocation; camera; microphone"`

## 🎯 Текущая реализация

При нажатии кнопки "Join now" приложение:

1. ✅ **Проверяет iframe** - детектирует работу в iframe
2. ✅ **Проверяет политику разрешений** - анализирует Permissions Policy
3. ✅ **Показывает предупреждение** - красный баннер вверху экрана
4. ✅ **Выводит инструкции** - как исправить проблему

## 🔴 Визуальные индикаторы

- **Красный баннер** вверху экрана (если iframe блокирует)
- **Детальное сообщение** в центральной карточке
- **Инструкции** с точным кодом для исправления

## 🚀 Для разработчиков Figma Make

Если вы контролируете iframe, добавьте эти атрибуты в родительский HTML:

```javascript
// JavaScript пример создания iframe с разрешениями
const iframe = document.createElement('iframe');
iframe.src = 'https://your-app.com';
iframe.allow = 'geolocation *; camera *; microphone *';
iframe.sandbox = 'allow-same-origin allow-scripts allow-forms allow-popups';
document.body.appendChild(iframe);
```

## 📚 Справка

- [MDN: Permissions Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy)
- [HTML iframe allow attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-allow)
- [Safari Feature Policy](https://webkit.org/blog/8311/intelligent-tracking-prevention-2-0/)
