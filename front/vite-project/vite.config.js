import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			manifest: {
				display: "standalone",
        display_override: ['window-controls-overlay'],
        name: 'ArtiTats',
        short_name: "ArtiTats",
        description: 'APP for booking appointments. Developed with React on the front, express on the back, and PostgreSQL database.',
        background_color: '#ffffff',
        icons: [
          {
            sizes: "192x192",
            src: "/android-chrome-192x192.png",
            type: "image/png",
            purpose: "any"
          },
          {
            sizes: "512x512",
            src: "/android-chrome-512x512.png",
            type: "image/png",
            purpose: "maskable"
          }
        ]
			},
		}),
	],
});
