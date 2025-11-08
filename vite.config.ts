import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Giả sử dùng React plugin
import { resolve } from 'path'; // Để alias nếu cần

export default defineConfig({
    plugins: [react()],
    css: {
        modules: {
            localsConvention: 'camelCase', // Tùy chọn: camelCase cho cx('wrapper') → styles.wrapper
            generateScopedName: '[name]__[local]___[hash:base64:5]', // Tùy chỉnh hash (default OK)
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'), // Tùy chọn: Import như import styles from '@/components/Header.module.scss';
        },
    },
});
