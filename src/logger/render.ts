// import styles from '../styles/logger.module.scss';

import { TLoggerMode, TLoggerOptions } from '../logger/types';

export const defaultLog = console.log;
export const defaultLogInfo = console.info;
export const defaultLogWarn = console.warn;
export const defaultLogError = console.error;

export class LoggerRender {
  private static container: HTMLDivElement;
  private static isVisible: boolean = false;
  private static maxMessages: number = 100;
  private static containerStyles?: Partial<CSSStyleDeclaration>;
  private static logStyles?: Partial<CSSStyleDeclaration>;
  private static mode: TLoggerMode = 'console';

  public static init(options?: TLoggerOptions) {
    if (LoggerRender.container) return;

    LoggerRender.maxMessages = options?.maxMessages || 100;
    LoggerRender.containerStyles = options?.containerStyles;
    LoggerRender.logStyles = options?.logStyles;

    LoggerRender.container = document.createElement('div');
    // LoggerRender.container.classList.add(styles.logger);

    if (LoggerRender.containerStyles) {
      Object.assign(LoggerRender.container.style, LoggerRender.containerStyles);
    }

    document.body.appendChild(LoggerRender.container);
  }

  private static appendLogMessage(type: string, messages: any[]) {
    const logMessage = document.createElement('p');
    logMessage.textContent = `[${type}] `;

    if (LoggerRender.logStyles) {
      Object.assign(logMessage.style, LoggerRender.logStyles);
    }

    messages.forEach(message => {
      if (typeof message !== 'object') {
        if (typeof message === 'string' && message.includes('color')) {
          const [_, color] = message.split(':');
          logMessage.style.color = color;
        } else {
          logMessage.textContent += message + ' ';
        }
      }
    });

    LoggerRender.container.appendChild(logMessage);

    if (LoggerRender.container.children.length > LoggerRender.maxMessages) {
      LoggerRender.container.removeChild(LoggerRender.container.firstChild as HTMLElement);
    }

    LoggerRender.container.scrollTop = LoggerRender.container.scrollHeight;
  }

  public static on() {
    if (LoggerRender.isVisible) return;

    LoggerRender.container.style.display = 'block';
    LoggerRender.isVisible = true;

    console.log = (...messages) => LoggerRender.appendLogMessage('LOG', messages);
    console.warn = (...messages) => LoggerRender.appendLogMessage('WARN', messages);
    console.error = (...messages) => LoggerRender.appendLogMessage('ERROR', messages);
    console.info = (...messages) => LoggerRender.appendLogMessage('INFO', messages);
  }

  public static off() {
    if (!LoggerRender.isVisible) return;

    console.log = defaultLog;
    console.warn = defaultLogWarn;
    console.info = defaultLogInfo;
    console.error = defaultLogError;

    LoggerRender.isVisible = false;
    LoggerRender.container.style.display = 'none';
  }

  public static switchVisible() {
    LoggerRender.isVisible ? LoggerRender.off() : LoggerRender.on();
  }

  public static switchMode(mode: TLoggerMode) {
    this.mode = mode;

    if (this.mode === 'visual') {
      this.init();
      this.on();
    } else {
      this.off();
    }
  }

  public static get Mode() {
    return this.mode;
  }
}
