import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { SettingsModel } from "../../model/SettingsModel.jsx";
import { mockChromeStorageSync } from "../mockChrome.jsx";
import { render, renderHook, screen } from "@testing-library/react";

describe("SettingsModel", () => {
    let settingsModel;
    //. loading mocked chrome
    beforeAll(() =>{
        global.chrome = {}
        global.chrome.storage = {}
        global.chrome.storage.sync = mockChromeStorageSync;
    });
    
    // clear storage before each test case
    beforeEach(() => {
        chrome.storage.sync.reset();
        settingsModel = renderHook(SettingsModel);
    });

    it("tests the useEffect block", () => {
        expect(settingsModel.result.current.systemPrompt).toBe("");
        expect(settingsModel.result.current.key).toBe("");
        expect(settingsModel.result.current.provider).toBe("OpenAI");
    });
    it("tests fetchProperty", async () => {
        await expect(settingsModel.result.current.fetchProperty("systemPrompt")).resolves.toBeUndefined();
        await expect(settingsModel.result.current.fetchProperty("key")).resolves.toBeUndefined();
        await expect(settingsModel.result.current.fetchProperty("provider")).resolves.toBeUndefined();
    });
    it("tests storeProperty", async () => {
        settingsModel.result.current.storeProperty("systemPrompt", "expected1");
        settingsModel.result.current.storeProperty("key","expected2");
        settingsModel.result.current.storeProperty("provider", "expected3");
        await expect(settingsModel.result.current.fetchProperty("systemPrompt")).resolves.toBe("expected1");
        await expect(settingsModel.result.current.fetchProperty("key")).resolves.toBe("expected2");
        await expect(settingsModel.result.current.fetchProperty("provider")).resolves.toBe("expected3");
    });
    it("tests storeProperty, with overwriting", async () => {
        await expect(settingsModel.result.current.fetchProperty("systemPrompt")).resolves.toBeUndefined();
        settingsModel.result.current.storeProperty("systemPrompt", "expected1");
        await expect(settingsModel.result.current.fetchProperty("systemPrompt")).resolves.toBe("expected1");
        settingsModel.result.current.storeProperty("systemPrompt", "expected2");
        await expect(settingsModel.result.current.fetchProperty("systemPrompt")).resolves.toBe("expected2");
    });
});
