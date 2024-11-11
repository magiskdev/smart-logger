export type TLoggerOptions = {
  maxMessages?: number;
  containerStyles?: Partial<CSSStyleDeclaration>;
  logStyles?: Partial<CSSStyleDeclaration>;
};

export type TModuleConfig = {
  name: string;
  color: string;
};

export type TLoggerMode = 'console' | 'visual';