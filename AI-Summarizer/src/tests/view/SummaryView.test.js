import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest"
import { SummaryView } from "../../view/SummaryView.jsx";
import { mockChromeStorageSync,
        links,
        keys} from "../mockChrome.jsx";
import { render, renderHook, screen } from "@testing-library/react";


describe("SummaryView", () => {
    //. loading mocked chrome
    beforeAll(() =>{
        global.chrome = {}
        global.chrome.storage = {}
        global.chrome.storage.sync = mockChromeStorageSync;
        global.chrome.tabs = {}
    });
    
    // clear storage before each test case
    beforeEach(() => {
        chrome.storage.sync.reset();
    });

    it("tests for SummaryView, with correct parameters for a video summary", async () => {
        global.chrome.tabs.query = (_, callback) => callback([links.validVideo]);
        global.chrome.storage.sync.set({ apiKeyGoogle: keys.valid});
        render(<SummaryView />);
        
        const summary = (await screen.findByTestId("SummaryView test")).textContent;
        expect(summary).toEqual("correct summary");
    });

    it("tests for SummaryView, with correct parameters for a webpage summary", async () => {
        global.chrome.tabs.query = (_, callback) => callback([links.invalidWebsite]);
        global.chrome.storage.sync.set({ provider: "Google"});
        global.chrome.storage.sync.set({ apiKeyGoogle: keys.valid});
        render(<SummaryView />);

        const summary = (await screen.findByTestId("SummaryView test")).textContent;
        expect(summary).toEqual("correct summary");
    });

    it("tests for SummaryView, with incorrect parameters", async () => {
        global.chrome.tabs.query = (_, callback) => callback([links.validVideo]);
        global.chrome.storage.sync.set({ apiKeyGoogle: keys.invalid});
        render(<SummaryView />);

        const summary = (await screen.findByTestId("SummaryView test")).textContent;
        expect(summary).toEqual("Failed to configure!");
    });
});
