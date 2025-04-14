import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { SummaryModel } from "../../model/SummaryModel.jsx";
import { mockChromeStorageSync,
        validVideo,
        invalidVideo } from "../mockChrome.jsx";
import { render, renderHook, screen } from "@testing-library/react";

describe("SummaryModel", () => {
    //. loading mocked chrome
    beforeAll(() =>{
        global.chrome = {}
        global.chrome.storage = {}
        global.chrome.storage.sync = mockChromeStorageSync;
        // global.chrome.Tabs = {}
    });
    
    // clear storage before each test case
    beforeEach(() => {
        chrome.storage.sync.reset();
    });
    
    it("tests getting video summary with a valid link", () => {
        var summaryModel = renderHook(SummaryModel);
        // global.chrome.Tabs.query = (_, callback) => callback([validVideo]);
        await summaryModel.result.current.getVideoSummary(validVideo);
        expect(summaryModel.result.status).toEqual(200);
    });
    it("tests getting video summary for invalid link", () => {
        var summaryModel = renderHook(SummaryModel);
        // global.chrome.Tabs.query = (_, callback) => callback([invalidVideo]);
        await summaryModel.result.current.getVideoSummary(invalidVideo);
        expect(summaryModel.result.status).toEqual(400);
    });
});
