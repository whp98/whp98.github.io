//vite.config.js
import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfig } from "vite";

export default defineConfig({
    base: "./",
    server: {
        port: 51888,
        hmr: false,
        disableHostCheck: true,
    },
    plugins: [
        SearchPlugin({
            previewLength: 80,
            encode: false,
            tokenize: "full", // 解决汉字不能多个输入
        }),
    ],
});
