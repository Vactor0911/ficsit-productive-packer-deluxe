import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
  ],
  base: "/ficsit-productive-packer-deluxe",
  server: {
    port: 8080,
    allowedHosts: ["0.tcp.jp.ngrok.io"],
  },
});
