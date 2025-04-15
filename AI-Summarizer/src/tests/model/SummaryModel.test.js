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
        global.chrome.storage.sync.set({ "systemPrompt": "Be verbose"});
        var summaryModel = renderHook(SummaryModel);
        summaryModel.result.current.setUrl(validVideo.url);
        setTimeout(() => {
            expect(summaryModel.result.current.url).toEqual(validVideo.url);
        }, 50);
        
        await summaryModel.result.current.getVideoSummary();
        // let now = Date.now();
        // while (Date.now() - now < 40000) {}
        // expect(summaryModel.result.current.summary.length).toBeGreaterThan(33);
        await waitFor(() => {
            expect(summaryModel.result.current.summary.length).toBeGreaterThan(33);
        }, { timeout: 50000 });

    }, 60000);

});
