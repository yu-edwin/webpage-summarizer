import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { SettingsController } from "../../controller/SettingsController.jsx";
import { mockChromeStorageSync } from "../mockChrome.jsx";
import { render, renderHook, screen } from "@testing-library/react";

describe("SettingsController", () => {
    //. loading mocked chrome
    beforeAll(() =>{
        global.chrome = {}
        global.chrome.storage = {}
        global.chrome.storage.sync = mockChromeStorageSync;
    });

    // clear storage before each test case
    beforeEach(() => {
        chrome.storage.sync.reset();
    });

    it("tests updateSystemPrompt, checks initial, then updates system prompt twice", () => {
        var settingsController = renderHook(SettingsController);
        setTimeout(() => {
            chrome.storage.sync.get(["systemPrompt"], (value) => {
                expect(value["systemPrompt"]).toBeUndefined();
            });
        }, 50);
        settingsController.result.current.updateSystemPrompt("expected1");
        setTimeout(() => {
            chrome.storage.sync.get(["systemPrompt"], (value) => {
                expect(value["systemPrompt"]).toBe("expected1");
            });
        }, 50);
        settingsController.result.current.updateSystemPrompt("expected2");
        setTimeout(() => {
            chrome.storage.sync.get(["systemPrompt"], (value) => {
                expect(value["systemPrompt"]).toBe("expected2");
            });
        }, 50);
    });

    it("tests updateSystemPrompt, updates system prompt once then update a different property", () => {
        var settingsController = renderHook(SettingsController);
        settingsController.result.current.updateSystemPrompt("expected1");
        setTimeout(() => {
            chrome.storage.sync.get(["systemPrompt"], (value) => {
                expect(value["systemPrompt"]).toBe("expected1");
            });
        }, 50);
        settingsController.result.current.updateProvider("expected2");
        setTimeout(() => {
            chrome.storage.sync.get(["systemPrompt"], (value) => {
                expect(value["systemPrompt"]).toBe("expected1");
            });
        }, 50);
    });

    it("tests updateKey, checks inital, then updates provider twice", () => {
        var settingsController = renderHook(SettingsController);
        setTimeout(() => {
            chrome.storage.sync.get(["provider"], (value) => {
                expect(value["provider"]).toBeUndefined();
            });
        }, 50);

        settingsController.result.current.updateProvider("Anthropic");
        setTimeout(() => {
            chrome.storage.sync.get(["provider"], (value) => {
                expect(value["provider"]).toBe("Anthropic");
            });
        }, 50);

        settingsController.result.current.updateProvider("Google");
        setTimeout(() => {
            chrome.storage.sync.get(["provider"], (value) => {
                expect(value["provider"]).toBe("Google");
            });
        }, 50);
    });

    it("tests updateKey, updates provider once then update a different property", () => {
        var settingsController = renderHook(SettingsController);
        settingsController.result.current.updateProvider("Anthropic");
        setTimeout(() => {
            chrome.storage.sync.get(["provider"], (value) => {
                expect(value["provider"]).toBe("Anthropic");
            });
        }, 50);

        settingsController.result.current.updateSystemPrompt("placeholder");
        setTimeout(() => {
            chrome.storage.sync.get(["provider"], (value) => {
                expect(value["provider"]).toBe("Anthropic");
            });
        }, 50);
    });
    it("tests updateProvider, updates same key twice", async () => {
        var settingsController = renderHook(SettingsController);
        settingsController.result.current.updateProvider("Anthropic");

        settingsController.result.current.updateKey("expected1");
        setTimeout(() => {
            chrome.storage.sync.get(["keyAnthropic"], (value) => {
                expect(value["keyAnthropic"]).toBe("expected1");
            });
        }, 50);

        settingsController.result.current.updateKey("expected2");
        setTimeout(() => {
            chrome.storage.sync.get(["keyAnthropic"], (value) => {
                expect(value["KeyAnthropic"]).toBe("expected2");
            });
        }, 50);
    });
    it("tests updateProvider, updates keys for 2 different providers", () => {
        var settingsController = renderHook(SettingsController);
        settingsController.result.current.updateProvider("Anthropic");
        settingsController.result.current.updateKey("expected1");
        settingsController.result.current.updateProvider("Google");
        settingsController.result.current.updateKey("expected2");

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

