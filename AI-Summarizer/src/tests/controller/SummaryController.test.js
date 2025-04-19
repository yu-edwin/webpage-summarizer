import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { SummaryController } from "../../controller/SummaryController.jsx";
import { mockChromeStorageSync,
        links,
        keys,
        validVideo,
        invalidVideo } from "../mockChrome.jsx";
import { render, renderHook, screen } from "@testing-library/react";

describe("SummaryController", () => {
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

    it("tests getUrl", () => {
        global.chrome.tabs.query = (_, callback) => callback([links.validWebsite]);
        
        const summaryController = new SummaryController();
        const url = summaryController.getUrl();

        expect(url).toEqual(links.validWebsite);
    });

    it("tests isVideo with a video link", async () => {
        const summaryController = new SummaryController();
        expect(await summaryController.isVideo(links.validVideo)).toBeTrue();
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
        const summaryController = new SummaryController();
        const content = summaryController(links.validWebsite);
        expect(content).toEqual("correct website content");
    });

    it("tests getWebpageContent with invalid website", async () => {
        const summaryController = new SummaryController();
        const content = summaryController(links.invalidWebsite);
        expect(content).toBeUndefined();
    });
        

    it("tests getWebpageSummary with valid website and valid key", async () => {
        global.chrome.storage.sync.set({ provider: "Google" });
        global.chrome.storage.sync.set({ keyGoogle: keys.valid });
        const summaryController = new SummaryController();
        const summary = summaryController.getWebpageSummary(links.validWebsite);
        expect(mockGoogle).toHaveBeenCalledWith(keys.valid);
        expect(summary).toEqual("correct summary");
    });

    it("tests getWebpageSummary with invalid website", async () => {
        global.chrome.storage.sync.set({ provider: "Google" });
        global.chrome.storage.sync.set({ keyGoogle: keys.valid });
        const summaryController = new SummaryController();
        const summary = summaryController.getWebpageSummary(links.invalidWebsite);
        expect(mockGoogle).toHaveBeenCalledWith(keys.valid);
        expect(summary).toEqual("Invalid website!");
    });

    it("tests getWebpageSummary with invalid key", async () => {
        global.chrome.storage.sync.set({ provider: "Google" });
        global.chrome.storage.sync.set({ keyGoogle: keys.invalid });
        const summaryController = new SummaryController();
        const summary = summaryController.getWebpageSummary(links.validWebsite);
        expect(mockGoogle).toHaveBeenCalledWith(keys.valid);
        expect(summary).toEqual("correct summary");
    });
    

    it("tests getVideoSummary with valid key", async () => {
        global.chrome.storage.sync.set({ keyGoogle: keys.valid});

        const summaryController = new SummaryController();
        const summary = await summaryController.getVideoSummary(links.validVideo);
        
        expect(mockGoogle).toHaveBeenCalledWith({ apiKey: keys.valid });
        expect(summary).toEqual("correct summary");
    });

    it("tests getVideoSummary with invalid key", async () => {
        global.chrome.storage.sync.set({ keyGoogle: keys.invalid});

        const summaryController = new SummaryController();
        const summary = await summaryController.getVideoSummary(links.validVideo);
        
        expect(mockGoogle).toHaveBeenCalledWith({ apiKey: keys.invalid });
        expect(summary).toEqual("Failed to configure!");
    });


    it("tests getSummary for video correctly", async () => {
        global.chrome.tabs.query = (_, callback) => callback([links.validVideo]);
        global.chrome.storage.sync.set({ provider: "Google" });
        global.chrome.storage.sync.set({ keyGoogle: keys.valid });

        const summaryController = new SummaryController();
        const summary = summaryController.getSummary();

        expect(mockGoogle).toHaveBeenCalledWith(keys.valid);
        expect(summary).toEqual("correct summary");
    });

    it("tests getSummary for website correctly", async () => {
        global.chrome.tabs.query = (_, callback) => callback([links.validWebsite]);
        global.chrome.storage.sync.set({ provider: "Google" });
        global.chrome.storage.sync.set({ keyGoogle: keys.valid });

        const summaryController = new SummaryController();
        const summary = summaryController.getSummary();

        expect(mockGoogle).toHaveBeenCalledWith(keys.valid);
        expect(summary).toEqual("correct summary");
    });





















    // it("tests getting video url", () => {
    //     global.chrome.tabs.query = (_, callback) => callback([validVideo]);
    //     const callbackMock = vi.fn();
    //     var summaryController = renderHook(SummaryController);

    //     summaryController.result.current.getUrl(callbackMock);
    //     expect(callbackMock).toHaveBeenCalledWith(validVideo.url);
        
    // });

    // it("tests checking if link is a valid video with a real link", async () => {
    //     var summaryController = renderHook(SummaryController);
    //     expect(await summaryController.result.current.isVideo(validVideo.url)).toEqual(true);
    // });

    // it("tests checking if link is a valid video with a fake link", async () => {
    //     var summaryController = renderHook(SummaryController);
    //     expect(await summaryController.result.current.isVideo(invalidVideo.url)).toEqual(false);
    // });

    // it("tests the whole SummaryController, with a valid video", () => {
    //     global.chrome.Tabs.query = (_, callback) => callback([validVideo]);
    //     var summaryController = renderHook(SummaryController);

    //     expect(summaryController.result.current.status).toEqual(200);
    //     expect(summaryController.result.current.url).toEqual(validVideo);
    //     expect(summaryController.result.current.summary).toBeTypeOf("string");
    // });
});

