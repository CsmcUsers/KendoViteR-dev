import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import { fileURLToPath, URL } from 'url';

// �ˬd�����ɮ׬O�_�s�b
const certExists = fs.existsSync('./cert/pri.key') && fs.existsSync('./cert/cert.crt');

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
            '@/assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@/service': fileURLToPath(new URL('./src/service', import.meta.url)),
        },
    },
    server: certExists
        ? {
              https: {
                  key: fs.readFileSync('./cert/pri.key'),
                  cert: fs.readFileSync('./cert/cert.crt'),
              },
              port: 5173,
          }
        : { port: 5173 },
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('/api/')) {
                        return 'api';
                    }
                    if (id.includes('/share/')) {
                        return 'share';
                    }
                    // �̸�Ƨ��� chunk
                    if (id.includes('/pages/')) {
                        const folder = id.split('/pages/')[1].split('/')[0];
                        return `pages-${folder}`;
                    }
                    if (id.includes('/components/')) {
                        return 'components';
                    }
                    if (id.includes('kendo')) {
                        return 'kendo-vendor';
                    }
                    if (id.includes('node_modules')) {
                        // React ����
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'react-vendor';
                        }
                        // Kendo UI ����
                        if (id.includes('@progress/kendo')) {
                            return 'kendo-vendor';
                        }
                        // �u��w
                        if (id.includes('lodash') || id.includes('dayjs') || id.includes('axios')) {
                            return 'utils-vendor';
                        }
                        // ��L�ĤT��M��
                        return 'vendor';
                    }
                },
            },
        },
    },
});
