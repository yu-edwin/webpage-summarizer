import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { render, renderHook, screen, waitFor} from "@testing-library/react";

// mocking implementations for OpenAI, Anthropic, Google
vi.mock("", async () =>{
    const mocks = await import("../mocks.js");
    return {
        GoogleGenAI: vi.fn().mockImplementation(() => new mocks.mockGoogle),
        createPartFromUri: vi.fn().mockImplementation(mocks.mockCreatePartFromUri)
    }
});

import { SummaryModel } from "../../model/SummaryModel.jsx";
import { mockChromeStorageSync, // chrome.storage
        links, // contains links for test cases
        mockGoogle, // GoogleGenAI mock
        mockCreatePartFromUri // GoogleGenAI mock
        } from "../mocks.js";


/**
 * Test cases for SummaryModel, tests for:
 * getting video summary with Google,
 * getting web summary with OpenAI,
 * getting web summary with Anthropic,
 * getting web summary with Google,
 */
describe("SummaryModel", () => {
    //. loading mocked chrome
    beforeAll(() =>{
        global.chrome = {}
        global.chrome.storage = {}
        global.chrome.storage.sync = mockChromeStorageSync;

        
    });
    
    // clear storage before each test case
    beforeEach(() => {
        global.chrome.storage.sync.reset();
        global.chrome.storage.sync.set({ keyGoogle: "correct key"});
        global.chrome.storage.sync.set({ systemPrompt: "Be verbose"});
    });
    
    it("tests getting video summary with a valid video", async () => {
        var summaryModel = renderHook(SummaryModel);
        summaryModel.result.current.setUrl(links.shortVideo);
        await summaryModel.result.current.getVideoSummary();
        setTimeout(() => {
            expect(mockGoogle).toHaveBeenCalledWith("correct key");
            expect(mockCreatePartFromUri).toHaveBeenCalledWith(links.shortVideo);
            expect(summary).toHaveBeenCalledWith("correct summary");

        }, 50);
    }, 200);

    it("tests getting video summary with a bad link", async () => {
        var summaryModel = renderHook(SummaryModel);
        summaryModel.result.current.setUrl(links.illegalWebsite);
        await summaryModel.result.current.getVideoSummary();
        setTimeout(() => {
            expect(mockGoogle).toHaveBeenCalledWith("correct key");
            expect(mockCreatePartFromUri).toHaveBeenCalledWith(links.illegalWebsite);
            expect(summary).toHaveBeenCalledWith("wrong summary");

        }, 50);
    }, 200);
});
