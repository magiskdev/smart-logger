declare global {
  interface Window {
    ya: any;
  }
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module 'simple-keyboard-key-navigation';

declare module '*.jpg';

declare module '*.png';

declare module '*.gif';
