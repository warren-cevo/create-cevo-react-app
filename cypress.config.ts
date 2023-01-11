import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setupNodeEvents (on, config) {
            // implement node event listeners here
        },
        supportFile: 'cypress/support/e2e.ts',
        video: false,
    },
    env: {
        BASE_URL: 'http://localhost:5173/'
    },
})
