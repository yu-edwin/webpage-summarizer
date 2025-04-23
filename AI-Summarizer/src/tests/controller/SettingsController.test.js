import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { SettingsController } from "../../controller/SettingsController.jsx";
import { mockChrome } from "../mocks.js";

/**
 * Test cases for SettingsController, tests for:
 * updating the properties for LLM rpoviders, API keys,
 * and system prompt.
 */
describe("test cases for SettingsController usage", () => {
    //. loading mocked chrome
    beforeAll(() =>{
        global.chrome = mockChrome
    });

    // clear storage before each test case
    beforeEach(() => {
        chrome.storage.sync.reset();
    });

    it("tests getInitialValues, stores values then calls on getInitialValues", async () => {
        chrome.storage.sync.set({ apiKeyGoogle: "correct key" });
        chrome.storage.sync.set({ apiKeyOpenAI: "incorrect key" });
        chrome.storage.sync.set({ apiKeyAnthropic: "incorrect key" });
        chrome.storage.sync.set({ provider: "Google" });
        chrome.storage.sync.set({ systemPrompt: "correct system prompt" });
        const settingsController = new SettingsController();

        const { initialProvider,
                initialApiKey,
                initialSystemPrompt } = await settingsController.getInitialValues();
        expect(initialProvider).toEqual("Google");
        expect(initialSystemPrompt).toEqual("correct system prompt");
        expect(initialApiKey).toEqual("correct key");
    });

    it("tests updateSystemPrompt, checks initial, then updates system prompt twice", () => {
       const settingsController = new SettingsController();
        setTimeout(() => {
            chrome.storage.sync.get(["systemPrompt"], (value) => {
                expect(value["systemPrompt"]).toBeUndefined();
            });
        }, 50);
        settingsController.updateSystemPrompt("expected1");
        setTimeout(() => {
            chrome.storage.sync.get(["systemPrompt"], (value) => {
                expect(value["systemPrompt"]).toBe("expected1");
            });
        }, 50);
        settingsController.updateSystemPrompt("expected2");
        setTimeout(() => {
            chrome.storage.sync.get(["systemPrompt"], (value) => {
                expect(value["systemPrompt"]).toBe("expected2");
            });
        }, 50);
    });

    it("tests updateSystemPrompt, updates system prompt once then update a different property", () => {
        const settingsController = new SettingsController();
        settingsController.updateSystemPrompt("expected1");
        setTimeout(() => {
            chrome.storage.sync.get(["systemPrompt"], (value) => {
                expect(value["systemPrompt"]).toBe("expected1");
            });
        }, 50);
        settingsController.updateProvider("expected2");
        setTimeout(() => {
            chrome.storage.sync.get(["systemPrompt"], (value) => {
                expect(value["systemPrompt"]).toBe("expected1");
            });
        }, 50);
    });

    it("tests updateKey, checks inital, then updates provider twice", () => {
        const settingsController = new SettingsController();
        setTimeout(() => {
            chrome.storage.sync.get(["provider"], (value) => {
                expect(value["provider"]).toBeUndefined();
            });
        }, 50);

        settingsController.updateProvider("Anthropic");
        setTimeout(() => {
            chrome.storage.sync.get(["provider"], (value) => {
                expect(value["provider"]).toBe("Anthropic");
            });
        }, 50);

        settingsController.updateProvider("Google");
        setTimeout(() => {
            chrome.storage.sync.get(["provider"], (value) => {
                expect(value["provider"]).toBe("Google");
            });
        }, 50);
    });

    it("tests updateKey, updates provider once then update a different property", () => {
        const settingsController = new SettingsController();
        settingsController.updateProvider("Anthropic");
        setTimeout(() => {
            chrome.storage.sync.get(["provider"], (value) => {
                expect(value["provider"]).toBe("Anthropic");
            });
        }, 50);

        settingsController.updateSystemPrompt("placeholder");
        setTimeout(() => {
            chrome.storage.sync.get(["provider"], (value) => {
                expect(value["provider"]).toBe("Anthropic");
            });
        }, 50);
    });
    it("tests updateProvider, updates same key twice", async () => {
        const settingsController = new SettingsController();
        settingsController.updateProvider("Anthropic");

        settingsController.updateKey("expected1");
        setTimeout(() => {
            chrome.storage.sync.get(["keyAnthropic"], (value) => {
                expect(value["keyAnthropic"]).toBe("expected1");
            });
        }, 50);

        settingsController.updateKey("expected2");
        setTimeout(() => {
            chrome.storage.sync.get(["keyAnthropic"], (value) => {
                expect(value["KeyAnthropic"]).toBe("expected2");
            });
        }, 50);
    });
    it("tests updateProvider, updates keys for 2 different providers", () => {
        const settingsController = new SettingsController();
        settingsController.updateProvider("Anthropic");
        settingsController.updateKey("expected1");
        settingsController.updateProvider("Google");
        settingsController.updateKey("expected2");

        setTimeout(() => {
            chrome.storage.sync.get(["keyAnthropic"], (value) => {
                expect(value["keyAnthropic"]).toBe("expected1");
            });
            chrome.storage.sync.get(["keyGoogle"], (value) => {
                expect(value["keyGoogle"]).toBe("expected2");
            });
        }, 50);
    });
});

