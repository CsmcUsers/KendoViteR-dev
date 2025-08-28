import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, URL } from 'url'
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@/': fileURLToPath(new URL('./src', import.meta.url)),
            '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@/share': fileURLToPath(new URL('./src/share', import.meta.url)),
            '@/api': fileURLToPath(new URL('./src/api', import.meta.url)),
            '@/data': fileURLToPath(new URL('./src/data', import.meta.url)),
        },
    },
    server: {
        // https: {
        //     key: fs.readFileSync('./cert/pri.key'),
        //     cert: fs.readFileSync('./cert/key.cer'),
        // },
        port: 5173,
    },
})
