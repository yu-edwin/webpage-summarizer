import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { SettingsModel } from "../../model/SettingsModel.jsx";
import { mockChromeStorageSync } from "../mockChrome.jsx";

describe("SettingsModel", () => {
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

    it("tests fetchProperty", async () => {
        const settingsModel = new SettingsModel();
        await expect(settingsModel.fetchProperty("systemPrompt")).resolves.toBeUndefined();
        await expect(settingsModel.fetchProperty("keyGoogle")).resolves.toBeUndefined();
        await expect(settingsModel.fetchProperty("provider")).resolves.toBeUndefined();
    });

    it("tests storeProperty", async () => {
        const settingsModel = new SettingsModel();
        settingsModel.storeProperty("systemPrompt", "expected1");
        settingsModel.storeProperty("keyGoogle","expected2");
        settingsModel.storeProperty("provider", "expected3");
        await expect(settingsModel.fetchProperty("systemPrompt")).resolves.toBe("expected1");
        await expect(settingsModel.fetchProperty("keyGoogle")).resolves.toBe("expected2");
        await expect(settingsModel.fetchProperty("provider")).resolves.toBe("expected3");
    });
    it("tests storeProperty, with overwriting", async () => {
        const settingsModel = new SettingsModel();
        await expect(settingsModel.fetchProperty("systemPrompt")).resolves.toBeUndefined();
        settingsModel.storeProperty("systemPrompt", "expected1");
        await expect(settingsModel.fetchProperty("systemPrompt")).resolves.toBe("expected1");
        settingsModel.storeProperty("systemPrompt", "expected2");
        await expect(settingsModel.fetchProperty("systemPrompt")).resolves.toBe("expected2");
    });
});
