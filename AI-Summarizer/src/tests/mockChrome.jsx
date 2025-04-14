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

export const validWebsite = {
    url: "https://en.wikipedia.org/wiki/React_(software)"
}
export const validVideo = {
    url: "https://www.youtube.com/watch?v=GE-lAftuQgc"
}
export const invalidVideo = {
    url: "https://www.youtube.com/watch?v=GE-lAftuQge"
}
export const invalidLink = {
    url: "chrome://extensions/"
}
