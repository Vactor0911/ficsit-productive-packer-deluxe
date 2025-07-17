import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    svgr(),
  ],
  base: "/ficsit-productive-packer-deluxe",
  server: {
    port: 8080,
    allowedHosts: ["0.tcp.jp.ngrok.io"],
  },
});
