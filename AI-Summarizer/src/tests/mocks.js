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

export const mockOpenAI = () => {};
export const mockAnthropic = () => {};
export const mockGemini = () => {};

/**
 * mocks video summary api calls.
 * returns the summary for videos under 1 hour and fails otherwise.
 */
export class mockGoogle {
    constructor(key) {
        this.key = apiKey;
        this.models = {
            generateContent: async (input) => {
                if (input
                    && input.model
                    && input.contents
                    && input.contents[0] // text part of prompt
                    && input.contents[1] // video part of prompt
                ) {
                    return {
                        text: "correct summary"
                    }
                } else {
                    return {
                        text: "wrong summary"
                    }
                }
            }
        }
    }
}
export const mockCreatePartFromUri = (url) => {
    return true;

}

export const links = {
    illegalWebsite: "chrome://settings",
    validWebsite: "https://en.wikipedia.org/wiki/React_(software)",
    invalidWebsite: "http://www.iuheoghuergerilo.com/",
    shortVideo: "https://www.youtube.com/watch?v=GE-lAftuQgc&ab_channel=RealLifeLore",
    longVideo: "https://www.youtube.com/watch?v=dCLhUialKPQ&ab_channel=JavaScriptMastery",
    invalidVideo: "https://www.youtube.com/watch?v=GE-lAftuQge"
}
