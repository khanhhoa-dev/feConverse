import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const variablesScss = resolve(__dirname, 'src/styles/_variables.scss').replace(/\\/g, '/');

export default defineConfig({
    plugins: [react()],
    css: {
        modules: {
            localsConvention: 'camelCase',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
        preprocessorOptions: {
            scss: {
                additionalData: `@use "${variablesScss}" as *;\n`,
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    base: '/',
});
