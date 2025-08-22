import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@/components': path.resolve(__dirname, './src/components'),
            '@/share': path.resolve(__dirname, './src/share'),
            '@/api': path.resolve(__dirname, './src/api'),
        },
    },
    server: {
        https: {
            key: fs.readFileSync('./cert/pri.key'),
            cert: fs.readFileSync('./cert/key.cer'),
        },
        port: 5173,
    },
});
