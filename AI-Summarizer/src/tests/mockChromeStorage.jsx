import { vi } from "vitest";

/**
 * mocks the chrome.storage functionality
 * requires chrome.storage.sync.get() and chrome.storage.sync.set()
 *
 */


export default {
    "sync": {
        "get": vi.fn((key) => {

        }),
        "set": vi.fn((key, value) => {
            
        })
    }
}
