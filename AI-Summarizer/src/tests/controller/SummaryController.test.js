import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { mockChrome,
        mockOpenAI,
        mockAnthropic,
        mockGoogle,
        links,
        keys } from "../mocks.js";

// mocking implementations for OpenAI, Anthropic, Google
vi.mock("openai", async () =>{
    return {
        OpenAI: vi.fn().mockImplementation((param) => new mockOpenAI(param)),
        default:  vi.fn().mockImplementation((param) => new mockOpenAI(param))
    }
});
vi.mock("@anthropic-ai/sdk", async () =>{
    return {
        Anthropic: vi.fn().mockImplementation((param) => new mockAnthropic(param)),
        default: vi.fn().mockImplementation((param) => new mockAnthropic(param))
    }
});
vi.mock("@google/genai", async () =>{
    return {
        GoogleGenAI: vi.fn().mockImplementation((param) => new mockGoogle(param))
    }
});

import { GoogleGenAI } from "@google/genai";
import { SummaryController } from "../../controller/SummaryController.jsx";

/**
 * Test cases for SummaryController, tests for:
 * getting summary for webpage and videos, as well as
 * associated helper functions.
 */
describe("test cases for SummaryController usage", () => {
    // loading mocked chrome
    beforeAll(() =>{
        global.chrome = mockChrome
    });
    
    // clear storage before each test case
    beforeEach(() => {
        chrome.storage.sync.reset();
    });

    it("tests getUrl", async () => {
        global.chrome.tabs.query = vi.fn().mockResolvedValue([{url: links.validWebsite}]);
        
        const summaryController = new SummaryController();
        const url = await summaryController.getUrl();

        expect(url).toEqual(links.validWebsite);
    });

    it("tests isVideo with a video link", async () => {
        const summaryController = new SummaryController();
        expect(await summaryController.isVideo(links.validVideo)).toBeTruthy();
    });

    it("tests isVideo with a YouTube link but video does not exist", async () => {
        const summaryController = new SummaryController();
        expect(await summaryController.isVideo(links.invalidVideo)).toBeFalsy();
    });

    it("tests isVideo with a non video link", async () => {
        const summaryController = new SummaryController();
        expect(await summaryController.isVideo(links.validWebsite)).toBeFalsy();
    });
    

    it("tests getWebpageContent with valid website", async () => {
        global.chrome.tabs.query = vi.fn().mockResolvedValue([{url: links.validWebsite, id: true}]);
        const summaryController = new SummaryController();
        const content = await summaryController.getWebpageContent();
        expect(content).toEqual("correct input");
    });

    it("tests getWebpageContent with invalid website", async () => {
        global.chrome.tabs.query = vi.fn().mockResolvedValue([{url: links.invalidWebsite, id: false}]);
        const summaryController = new SummaryController();
        const content = await summaryController.getWebpageContent();
        expect(content).toEqual("wrong input");
    });
        

    it("tests getWebpageSummary with valid website and valid key", async () => {
        global.chrome.storage.sync.set({ provider: "Google" });
        global.chrome.storage.sync.set({ apiKeyGoogle: keys.valid });
        global.chrome.tabs.query = vi.fn().mockResolvedValue([{url: links.validWebsite, id: true}]);

        const summaryController = new SummaryController();
        const summary = await summaryController.getWebpageSummary();
        expect(GoogleGenAI).toHaveBeenLastCalledWith({apiKey: keys.valid});
        expect(summary).toEqual("correct summary");
    });

    it("tests getWebpageSummary with invalid website", async () => {
        global.chrome.storage.sync.set({ provider: "Google" });
        global.chrome.storage.sync.set({ apiKeyGoogle: keys.valid });
        global.chrome.tabs.query = vi.fn().mockResolvedValue([{url: links.invalidWebsite, id: false}]);

        const summaryController = new SummaryController();
        const summary = await summaryController.getWebpageSummary();
        expect(GoogleGenAI).toHaveBeenLastCalledWith({ apiKey: keys.valid});
        expect(summary).toEqual("Failed to generate webpage summary!");
    });

    it("tests getWebpageSummary with invalid key", async () => {
        global.chrome.storage.sync.set({ provider: "Google" });
        global.chrome.storage.sync.set({ apiKeyGoogle: keys.invalid });
        const summaryController = new SummaryController();
        const summary = await summaryController.getWebpageSummary();
        expect(GoogleGenAI).toHaveBeenLastCalledWith({ apiKey: keys.invalid});
        expect(summary).toEqual("Failed to generate webpage summary!");
    });
 

    it("tests getVideoSummary with valid key", async () => {
        global.chrome.storage.sync.set({ apiKeyGoogle: keys.valid});

        const summaryController = new SummaryController();
        const summary = await summaryController.getVideoSummary(links.validVideo);
        
        expect(GoogleGenAI).toHaveBeenLastCalledWith({ apiKey: keys.valid });
        expect(summary).toEqual("correct summary");
    });

    it("tests getVideoSummary with invalid key", async () => {
        global.chrome.storage.sync.set({ apiKeyGoogle: keys.invalid});

        const summaryController = new SummaryController();
        const summary = await summaryController.getVideoSummary(links.validVideo);
        
        expect(GoogleGenAI).toHaveBeenLastCalledWith({ apiKey: keys.invalid });
        expect(summary).toEqual("Failed to generate video summary!");
    });


    it("tests getSummary for video correctly", async () => {
        global.chrome.storage.sync.set({ provider: "Google" });
        global.chrome.storage.sync.set({ apiKeyGoogle: keys.valid });
        global.chrome.tabs.query = vi.fn().mockResolvedValue([{url: links.validVideo, id: true}]);

        const summaryController = new SummaryController();
        const summary = await summaryController.getSummary();

        expect(GoogleGenAI).toHaveBeenLastCalledWith({ apiKey: keys.valid });
        expect(summary).toEqual("correct summary");
    });

    it("tests getSummary for website correctly", async () => {
        global.chrome.storage.sync.set({ provider: "Google" });
        global.chrome.storage.sync.set({ apiKeyGoogle: keys.valid });
        global.chrome.tabs.query = vi.fn().mockResolvedValue([{url: links.validWebsite, id: true}]);

        const summaryController = new SummaryController();
        const summary = await summaryController.getSummary();

        expect(GoogleGenAI).toHaveBeenLastCalledWith({ apiKey: keys.valid });
        expect(summary).toEqual("correct summary");
    });

});
