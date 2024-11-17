import {
  defaultLog,
  defaultLogError,
  defaultLogInfo,
  defaultLogWarn,
  LoggerRender,
} from "./render";
import { TLoggerMode, TLoggerOptions, TModuleConfig } from "./types";

declare let window: any;

const getTime = () => new Date().toLocaleString();

export function initLoggerConfig<T extends Record<string, TModuleConfig>>(
  config: T,
  loggerOptions?: TLoggerOptions
) {
  if (loggerOptions) {
    LoggerRender.init(loggerOptions);
  }

  const moduleConfig = config;

  function createLogger(scope: keyof T, isEnabled: boolean = true) {
    console.log(`${String(scope)} logger initialized:`, isEnabled);

    let _isEnabled = isEnabled;

    return {
      logMsg(...args: any[]) {
        if (_isEnabled) {
          if (LoggerRender.Mode === "console") {
            defaultLog(
              `%c${getTime()} (${moduleConfig[scope].name})`,
              `color: ${moduleConfig[scope].color}`,
              ...args
            );
          } else {
            console.log(`[${moduleConfig[scope].name}]`, ...args);
          }
        }
      },
      logInfo(...args: any[]) {
        if (_isEnabled) {
          if (LoggerRender.Mode === "console") {
            defaultLogInfo(
              `%c${getTime()} (${moduleConfig[scope].name})`,
              `color: ${moduleConfig[scope].color}`,
              ...args
            );
          } else {
            console.info(`[${moduleConfig[scope].name}]`, ...args);
          }
        }
      },
      logWarn(...args: any[]) {
        if (_isEnabled) {
          if (LoggerRender.Mode === "console") {
            defaultLogWarn(
              `%c${getTime()} (${moduleConfig[scope].name})`,
              `color: ${moduleConfig[scope].color}`,
              ...args
            );
          } else {
            console.warn(`[${moduleConfig[scope].name}]`, ...args);
          }
        }
      },
      logErr(...args: any[]) {
        if (_isEnabled) {
          if (LoggerRender.Mode === "console") {
            defaultLogError(
              `%c${getTime()} (${moduleConfig[scope].name})`,
              `color: ${moduleConfig[scope].color}`,
              ...args
            );
          } else {
            console.error(`[${moduleConfig[scope].name}]`, ...args);
          }
        }
      },
      switchLogger(state: boolean) {
        _isEnabled = state;
      },
    };
  }

  const loggerStore: Record<string, ReturnType<typeof createLogger>> = {};

  function useLogger(scope: keyof T, isEnabled: boolean = true) {
    if (!moduleConfig[scope]) {
      throw new Error(
        `Module "${String(scope)}" is not defined in the logger configuration.`
      );
    }

    if (!loggerStore[scope as string]) {
      loggerStore[scope as string] = createLogger(scope, isEnabled);
    }
    return loggerStore[scope as string];
  }

  function switchLoggerMode(mode: TLoggerMode) {
    LoggerRender.switchMode(mode);
  }

  if (typeof window !== 'undefined') {
      window.useLogger = useLogger;
  }

  if (typeof window !== 'undefined') {
      window.switchLoggerMode = switchLoggerMode;
  }

  return { useLogger, switchLoggerMode };
}
