import { vi } from "vitest";

const storage = {}

/**
 * mocks the chrome.storage functionality
 * requires chrome.storage.sync.get() and chrome.storage.sync.set()
 *
 */
export const mockChromeStorageSync = {
    "sync": {
        "get": vi.fn((keys) => {
            const out = {}
            for (const key of keys) {
                out[key] = storage[key];
            }
            return Promise.resolve(out);
        }),
        "set": vi.fn((dict) => {
            for (const key in dict) {
                storage[key] = dict[key];
            }
        }),
        "reset": vi.fn(() => {
           for (const key in storage) {
                delete storage[key];
           } 
        })
    }
}
