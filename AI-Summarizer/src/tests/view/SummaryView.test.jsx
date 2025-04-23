import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest"

// mocking implementations for OpenAI, Anthropic, Google
vi.mock("openai", async () =>{
    const mocks = await import("../mocks.js");
    return {
        OpenAI: vi.fn().mockImplementation((param) => new mocks.mockOpenAI(param)),
        default:  vi.fn().mockImplementation((param) => new mocks.mockOpenAI(param))
    }
});
vi.mock("@anthropic-ai/sdk", async () =>{
    const mocks = await import("../mocks.js");
    return {
        Anthropic: vi.fn().mockImplementation((param) => new mocks.mockAnthropic(param)),
        default: vi.fn().mockImplementation((param) => new mocks.mockAnthropic(param))
    }
});
vi.mock("@google/genai", async () =>{
    const mocks = await import("../mocks.js");
    return {
        GoogleGenAI: vi.fn().mockImplementation((param) => new mocks.mockGoogle(param)),
    }
});

import { SummaryView } from "../../view/SummaryView.jsx";
import { mockChrome,
        links,
        keys} from "../mocks.js";
import { render, screen, cleanup } from "@testing-library/react";


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
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        const summary = (await screen.findByTestId("SummaryView test")).textContent;
        expect(summary).toEqual("correct summary");
    });

    it("tests for SummaryView, with correct parameters for a webpage summary", async () => {
        global.chrome.tabs.query = vi.fn().mockResolvedValue([{url: links.validWebsite, id: true}]);
        global.chrome.storage.sync.set({ provider: "Google"});
        global.chrome.storage.sync.set({ apiKeyGoogle: keys.valid});
        render(<SummaryView />);

        await new Promise(resolve => setTimeout(resolve, 2000));
        const summary = (await screen.findByTestId("SummaryView test")).textContent;
        expect(summary).toEqual("correct summary");
    });

    it("tests for SummaryView, with incorrect parameters", async () => {
        global.chrome.tabs.query = vi.fn().mockResolvedValue([{url: links.invalidVideo, id: false}]);
        global.chrome.storage.sync.set({ apiKeyGoogle: keys.valid});
        render(<SummaryView />);

        await new Promise(resolve => setTimeout(resolve, 2000));
        const summary = (await screen.findByTestId("SummaryView test")).textContent;
        expect(summary).toEqual("Invalid website!");
    });
});
