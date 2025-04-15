import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { SummaryController } from "../../controller/SummaryController.jsx";
import { mockChromeStorageSync,
        validVideo,
        invalidVideo } from "../mockChrome.jsx";
import { render, renderHook, screen } from "@testing-library/react";

describe("SummaryController", () => {
    //. loading mocked chrome
    beforeAll(() =>{
        global.chrome = {}
        global.chrome.storage = {}
        global.chrome.storage.sync = mockChromeStorageSync;
        global.chrome.Tabs = {}
    });
    
    // clear storage before each test case
    beforeEach(() => {
        chrome.storage.sync.reset();
    });
    
    it("tests getting video url", () => {
        var summaryController = renderHook(SummaryController);
        global.chrome.Tabs.query = (_, callback) => callback([validVideo]);

        expect(summaryController.result.getUrl()).toEqual(validVideo);
    });

    it("tests checking if link is a valid video with a real link", () => {
        var summaryController = renderHook(SummaryController);
        expect(summaryController.result.isVideo(validVideo)).toEqual(true);
    });

    it("tests checking if link is a valid video with a fake link", () => {
        var summaryController = renderHook(SummaryController);
        expect(summaryController.result.isVideo(invalidVideo)).toEqual(false);
    });

    it("tests the whole SummaryController, with a valid video", () => {
        global.chrome.Tabs.query = (_, callback) => callback([validVideo]);
        var summaryController = renderHook(SummaryController);

        expect(summaryController.result.current.status).toEqual(200);
        expect(summaryController.result.current.url).toEqual(validVideo);
        expect(summaryController.result.current.summary).toBeTypeOf("string");
    });
});

