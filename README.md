README.md

# Smart Logger

🛠️ **Smart Logger** — это гибкая и мощная TypeScript-библиотека для логирования, которая позволяет переключаться между консольным и визуальным режимами. Поддерживает динамическую настройку модулей и возможность глобального управления выводом логов.

## 📦 Установка

Установите библиотеку с помощью npm или yarn:

```bash
npm install smart-logger-ts

или

yarn add smart-logger-ts

📝 Описание

Smart Logger позволяет:

    Создавать логгеры для различных модулей с настраиваемыми цветами и именами.
    Переключаться между консольным и визуальным режимами отображения логов.
    Управлять логированием глобально: включать и выключать вывод для всех модулей одновременно.
    Использовать гибкие настройки для контейнера визуального отображения логов.

🚀 Быстрый старт
1. Инициализация логгера

import { initLoggerConfig, useLogger } from 'smart-logger-ts';

// Инициализация логгеров с настройками
const { useLogger, switchLoggerMode } = initLoggerConfig(
  {
    ADS: { name: 'ADS Module', color: '#DAA520' },
    STREAM: { name: 'Stream Module', color: '#FFDAB9' },
    BASE: { name: 'Base Module', color: '#708090' },
    CUSTOM: { name: 'Custom Module', color: '#FF69B4' },
  },
  {
    maxMessages: 50,
    containerStyles: { backgroundColor: '#f0f0f0', padding: '10px' },
    logStyles: { color: '#000' },
  }
);

2. Использование логгера

// Получаем логгер для модуля
const adsLogger = useLogger('ADS');

// Логирование сообщений
adsLogger.logMsg('Это сообщение из модуля ADS');
adsLogger.logInfo('Информация для модуля ADS');
adsLogger.logWarn('Предупреждение из модуля ADS');
adsLogger.logErr('Ошибка в модуле ADS');

// Переключение режима глобально
switchLoggerMode('visual');
adsLogger.logMsg('Теперь сообщения отображаются в визуальном режиме');
switchLoggerMode('console');
adsLogger.logMsg('Теперь сообщения отображаются в консоли');

3. Использование в браузере

Если вы используете библиотеку в браузере, вы можете также получить доступ к логгерам через глобальные переменные:

window.useLogger('CUSTOM').logMsg('Сообщение через глобальный доступ');
window.switchLoggerMode('visual');

⚙️ API
initLoggerConfig(config, loggerOptions?)

Инициализирует конфигурацию логгеров.

    Параметры:
        config — объект с модулями, где каждый модуль имеет свойства:
            name: string — название модуля.
            color: string — цвет для логирования.
        loggerOptions (опционально) — настройки для визуального отображения:
            maxMessages: number — максимальное количество сообщений в контейнере.
            containerStyles: Partial<CSSStyleDeclaration> — стили для контейнера.
            logStyles: Partial<CSSStyleDeclaration> — стили для сообщений.

    Возвращает: { useLogger, switchLoggerMode }

useLogger(scope, isEnabled?)

Создает логгер для указанного модуля.

    Параметры:
        scope: string — ключ модуля из конфигурации.
        isEnabled: boolean (необязательно) — включить или отключить логирование (по умолчанию true).
    Методы логгера:
        logMsg(...args) — обычное сообщение.
        logInfo(...args) — информационное сообщение.
        logWarn(...args) — предупреждение.
        logErr(...args) — сообщение об ошибке.
        switchLogger(state: boolean) — включение/отключение логирования.

switchLoggerMode(mode)

Переключает глобальный режим логирования.

    Параметры:
        mode: 'console' | 'visual' — режим вывода логов.

🛠 Примеры использования
Инициализация с кастомными настройками

import { initLoggerConfig } from 'smart-logger-ts';

const { useLogger, switchLoggerMode } = initLoggerConfig(
  {
    ANALYTICS: { name: 'Analytics Module', color: '#32CD32' },
  },
  {
    maxMessages: 30,
    containerStyles: { backgroundColor: '#fff', border: '1px solid #ddd' },
    logStyles: { fontSize: '14px', color: '#333' },
  }
);

const analyticsLogger = useLogger('ANALYTICS');
analyticsLogger.logInfo('Лог из аналитического модуля');

Глобальное управление режимами

switchLoggerMode('visual');
analyticsLogger.logMsg('Теперь лог отображается в визуальном режиме');

switchLoggerMode('console');
analyticsLogger.logMsg('Теперь лог отображается в консоли');

📄 Лицензия

MIT License. Вы можете свободно использовать эту библиотеку в своих проектах.
👥 Поддержка

Если у вас возникли вопросы или предложения, создайте issue на GitHub.
🌟 Поддержите проект

Если вам понравилась библиотека, поставьте звёздочку на GitHub и оставьте отзыв на npm.