import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    css: {
        modules: {
            localsConvention: 'camelCase',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/styles/variables.scss";`,
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    base: '/',
    build: {
        minify: 'terser',
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
});
