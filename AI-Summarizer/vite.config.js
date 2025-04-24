import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react()
    ],
    test: {
        environment: "jsdom",
        testTimeout: 60000,
    },
    esbuild: {
        minifyIdentifiers: false,
        keepNames: true
    },
    build: {
        minify: 'esbuild',
    }
})
