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

export const mockChrome = {
    storage: {
        sync: {
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
    },
    tabs: {},
    scripting: {
        executeScript: vi.fn().mockImplementation(({target}) => {
            if (!target.tabId) {
                return Promise.resolve([{ result: "wrong input" }])
            } else{
                return Promise.resolve([{ result: "correct input" }])
            }
        })
    }
}

/**
 * mocks OpenAI api calls
 * returns correct summary if given correct parameters
 * and wrong summary otherwise.
 */
export class mockOpenAI {
    constructor(key) {
        this.key = key.apiKey;
        this.responses = {
            create: async (input) => {
                if (
                    this.key === keys.valid
                    && input
                    && input.model
                    && input.instructions
                    && input.input === "correct input") {
                    return {
                        output_text: "correct summary"
                    }
                }
                throw 400;
            }
        }
    }
};

/**
 * mocks Anthropic api calls
 * returns correct summary if given correct parameters
 * and wrong summary otherwise.
 */
export class mockAnthropic {
    constructor(key) {
        this.key = key.apiKey;
        this.messages = {
            create: async (input) => {
                if (this.key === keys.valid
                    && input
                    && input.model
                    && input.max_tokens
                    && input.system
                    && input.messages
                    && input.messages[0].role
                    && input.messages[0].content === "correct input") {
                    return {
                        content: [{
                            text: "correct summary"
                        }]
                    }
                }
                throw 400;
            }
        }
    }
};


/**
 * mocks google api calls for both webpage and video summaries
 * returns the summary for videos under 1 hour and fails otherwise.
 */
export class mockGoogle {
    constructor(param) {
        this.key = param.apiKey;
        this.models = {
            generateContent: async (input) => {
                if (!this.key) {
                    throw 403;
                }
                if (this.key === keys.valid
                    && input
                    && input.model
                    && input.config
                    && input.config.systemInstruction
                    && input.contents
                    && ((typeof input.contents === "string" && input.contents === "correct input")
                        || input.contents.fileData.fileUri === links.validVideo)) {
                        return { text: "correct summary" };
                    }

                throw 400;
            }
        }
    }
}

export const keys = {
    valid: "valid",
    invalid: "invalid",
    missing: ""
}

export const links = {
    illegalWebsite: "chrome://settings",
    validWebsite: "https://en.wikipedia.org/wiki/React_(software)",
    invalidWebsite: "http://www.iuheoghuergerilo.com/",
    validVideo: "https://www.youtube.com/watch?v=GE-lAftuQgc&ab_channel=RealLifeLore",
    shortVideo: "https://www.youtube.com/watch?v=GE-lAftuQgc&ab_channel=RealLifeLore",
    longVideo: "https://www.youtube.com/watch?v=dCLhUialKPQ&ab_channel=JavaScriptMastery",
    invalidVideo: "https://www.youtube.com/watch?v=GE-lAftuQge"
}
