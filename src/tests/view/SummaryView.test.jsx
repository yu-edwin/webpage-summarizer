import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest"
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
        GoogleGenAI: vi.fn().mockImplementation((param) => new mockGoogle(param)),
    }
});

import { SummaryView } from "../../view/SummaryView.jsx";
import { render, screen, cleanup } from "@testing-library/react";


/**
 * Test cases for SummaryView, tests for:
 * getting webpage and video summaries.
 */
describe("SummaryView", () => {
    //. loading mocked chrome
    beforeAll(() =>{
        global.chrome = mockChrome;
    });
    
    // clear storage before each test case
    beforeEach(() => {
        chrome.storage.sync.reset();
        cleanup();
    });

    it("tests for SummaryView, with correct parameters for a video summary", async () => {
        global.chrome.tabs.query = vi.fn().mockResolvedValue([{url: links.validVideo, id: true}]);
        global.chrome.storage.sync.set({ apiKeyGoogle: keys.valid});
        render(<SummaryView />);
        
        await new Promise(resolve => setTimeout(resolve, 200));
        const summary = (await screen.findByTestId("SummaryView test")).textContent;
        expect(summary).toEqual("correct summary");
    });

    it("tests for SummaryView, with correct parameters for a webpage summary", async () => {
        global.chrome.tabs.query = vi.fn().mockResolvedValue([{url: links.validWebsite, id: true}]);
        global.chrome.storage.sync.set({ provider: "Google"});
        global.chrome.storage.sync.set({ apiKeyGoogle: keys.valid});
        render(<SummaryView />);

        await new Promise(resolve => setTimeout(resolve, 200));
        const summary = (await screen.findByTestId("SummaryView test")).textContent;
        expect(summary).toEqual("correct summary");
    });

    it("tests for SummaryView, with incorrect parameters", async () => {
        global.chrome.tabs.query = vi.fn().mockResolvedValue([{url: links.invalidVideo, id: false}]);
        global.chrome.storage.sync.set({ apiKeyGoogle: keys.valid});
        render(<SummaryView />);

        await new Promise(resolve => setTimeout(resolve, 200));
        const summary = (await screen.findByTestId("SummaryView test")).textContent;
        expect(summary).toEqual("Invalid website!");
    });
});
