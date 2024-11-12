import dts from "vite-plugin-dts";
import { libInjectCss } from 'vite-plugin-lib-inject-css'

const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "smart-logger-ts",
      fileName: (format) => `main.${format}.js`,
    },
    rollupOptions: {
      external: ["babel-polyfill", "regenerator-runtime"],
    },
  },
  plugins: [libInjectCss(), dts({ include: ["src"] })],
});
