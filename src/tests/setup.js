import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// runs a cleanup after each tests case (e.g. clearing jsdom)
afterEach(() => {
    cleanup()
})
