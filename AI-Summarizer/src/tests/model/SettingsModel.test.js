import { describe, it, expect, beforeAll } from "vitest";
import { SettingsModel } from "../model/SettingsModel.jsx";
import { mockChromeStorage } from "../mockChromStorage.jsx";

describe("SettingsModel", () => {
    //. loading mocked chrome
    beforeAll(() =>{
        global.chrome = {}
        global.chrome.storage = {}
        global.chrome.storage.sync = mockChromeSync;
    });


});
