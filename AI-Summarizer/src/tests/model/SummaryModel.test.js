import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { SummaryModel } from "../../model/SummaryModel.jsx";
import { mockChromeStorageSync,
        validVideo,
        invalidVideo } from "../mockChrome.jsx";
import { render, renderHook, screen, waitFor} from "@testing-library/react";

describe("SummaryModel", () => {
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
    
    it("tests getting video summary with a valid link", async () => {
        global.chrome.storage.sync.set({ "keyGoogle": "AIzaSyCaxOfjUP72H1qGI909J9ORGFOiywrFfEQ"});
        global.chrome.storage.sync.set({ "systemPrompt": "Be very concise"});

        var summaryModel = renderHook(SummaryModel);
        summaryModel.result.current.setUrl(validVideo);
        await summaryModel.result.current.getVideoSummary();
        await waitFor
        expect(summaryModel.result.current.summary.length).toBeGreaterThan(50);
    });
    it("tests getting video summary for invalid link", async () => {
        var summaryModel = renderHook(SummaryModel);
        summaryModel.result.current.setUrl(invalidVideo);
        await summaryModel.result.current.getVideoSummary();
        expect(summaryModel.result.current.summary).toEqual("Failed to generate video summary!");
    });
});
