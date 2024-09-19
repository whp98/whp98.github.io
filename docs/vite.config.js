//vite.config.js
import { defineConfig } from "vite";
export default defineConfig({
    base: "./",
    server: {
        port: 51888,
        hmr: false,
        disableHostCheck: true,
    },
    plugins: [
    ],
    assetsInclude: ['**/*.PNG','**/*.JPG']
});
