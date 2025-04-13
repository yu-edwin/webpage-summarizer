import { vi } from "vitest";

const storage = {}

/**
 * mocks the chrome.storage functionality
 * requires chrome.storage.sync.get() and chrome.storage.sync.set()
 * chrome.storage.sync.reset for reseting storage before each test case
 */
export const mockChromeStorageSync = {
    "get": vi.fn((keys, callback) => {
        const out = {}
        for (const key of keys) {
            out[key] = storage[key];
        }
        callback(out);
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
