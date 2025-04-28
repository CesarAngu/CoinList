import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "GekoCoin App",
        short_name: "GekoCoin",
        description: "Consulta y guarda tus criptomonedas favoritas en GekoCoin.",
        start_url: "/",
        display: "standalone",
        background_color: "#121212",
        theme_color: "#121212",
        orientation: "portrait",
        icons: [
          {
            src: "/src/assets/icon.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/src/assets/icon.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});
