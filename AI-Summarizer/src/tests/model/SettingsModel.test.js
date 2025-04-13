import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { SettingsModel } from "../model/SettingsModel.jsx";
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


});
