import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/setup.js',
        coverage: {
            provider: 'istanbul',
        }
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
        },
    },
})
