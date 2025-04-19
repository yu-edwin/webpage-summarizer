import { describe, it, expect, beforeAll, beforeEach } from "vitest";

// mocking implementations for OpenAI, Anthropic, Google
vi.mock("", async () =>{
    const mocks = await import("../mocks.js");
    return {
        GoogleGenAI: vi.fn().mockImplementation(() => new mocks.mockGoogle),
        createPartFromUri: vi.fn().mockImplementation(mocks.mockCreatePartFromUri),
        OpenAI: vi.fn().mockImplementation(() => new mocks.mockOpenAI),
        Anthropic: vi.fn().mockImplementation(() => new mocks.mockAnthropic),
    }
});

import { SummaryModel } from "../../model/SummaryModel.jsx";
import { links,
        keys,
        mockOpenAI, // openai mock
        mockAnthropic, // Anthropic mock
        mockGoogle, // GoogleGenAI mock
        } from "../mocks.js";


/**
 * Test cases for SummaryModel, tests for:
 * getting video summary with Google,
 * getting web summary with OpenAI,
 * getting web summary with Anthropic,
 * getting web summary with Google,
 */
describe("SummaryModel", () => {
    it("tests getting webpage summary with valid webpage and valid key using OpenAI", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryOpenAI(links.validWebsite, keys.valid);
        setTimeout(() => {
            expect(mockOpenAI).toHaveBeenCalledWith({ apiKey: keys.valid });
            expect(summary).toEqual("correct summary");
        }, 50);
    });

    it("tests getting webpage summary with  invalid key using OpenAI", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryOpenAI(links.validWebsite, keys.invalid);
        setTimeout(() => {
            expect(mockOpenAI).toHaveBeenCalledWith({ apiKey: keys.invalid });
            expect(summary).toEqual("Failed to configure!");
        }, 50);
    });

    it("tests getting webpage summary with invalid webpage using OpenAI", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryOpenAI(links.invalidWebsite, keys.valid);
        setTimeout(() => {
            expect(mockOpenAI).toHaveBeenCalledWith({ apiKey: keys.invalid });
            expect(summary).toEqual("Failed to generate video summary!");
        }, 50);
    });


    


    it("tests getting webpage summary with valid webpage and valid key using Anthropic", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryAnthropic(links.validWebsite, keys.valid);
        setTimeout(() => {
            expect(mockAnthropic).toHaveBeenCalledWith({ apiKey: keys.valid });
            expect(summary).toEqual("correct summary");
        }, 50);
    });

    it("tests getting webpage summary with  invalid key using Anthropic", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryAnthropic(links.validWebsite, keys.invalid);
        setTimeout(() => {
            expect(mockAnthropic).toHaveBeenCalledWith({ apiKey: keys.invalid });
            expect(summary).toEqual("Failed to configure!");
        }, 50);
    });

    it("tests getting webpage summary with invalid webpage using Anthropic", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryAnthropic(links.invalidWebsite, keys.valid);
        setTimeout(() => {
            expect(mockAnthropic).toHaveBeenCalledWith({ apiKey: keys.invalid });
            expect(summary).toEqual("Failed to generate video summary!");
        }, 50);
    });
    





    it("tests getting webpage summary with valid webpage and valid key using Google", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryGoogle(links.validWebsite, keys.valid);
        setTimeout(() => {
            expect(mockGoogle).toHaveBeenCalledWith({ apiKey: keys.valid });
            expect(summary).toEqual("correct summary");
        }, 50);
    });

    it("tests getting webpage summary with  invalid key using Google", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryGoogle(links.validWebsite, keys.invalid);
        setTimeout(() => {
            expect(mockGoogle).toHaveBeenCalledWith({ apiKey: keys.invalid });
            expect(summary).toEqual("Failed to configure!");
        }, 50);
    });

    it("tests getting webpage summary with invalid webpage using Google", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryGoogle(links.invalidWebsite, keys.valid);
        setTimeout(() => {
            expect(mockGoogle).toHaveBeenCalledWith({ apiKey: keys.invalid });
            expect(summary).toEqual("Failed to generate video summary!");
        }, 50);
    });




    it("tests getting video summary with valid link and valid key", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getVideoSummary(links.shortVideo, keys.valid);
        setTimeout(() => {
            expect(mockGoogle).toHaveBeenCalledWith({ apiKey: keys.valid });
            expect(summary).toEqual("correct summary");
        }, 50);
    });

    it("tests getting video summary with invalid key", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getVideoSummary(links.shortVideo, keys.invalid);
        setTimeout(() => {
            expect(mockGoogle).toHaveBeenCalledWith({ apiKey: keys.invalid });
            expect(summary).toEqual("Failed to configure!");
        }, 50);
    });

    it("tests getting video summary with invalid link", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getVideoSummary(links.illegalWebsite, keys.valid);
        setTimeout(() => {
            expect(mockGoogle).toHaveBeenCalledWith({ apiKey: keys.valid });
            expect(summary).toEqual("Failed to generate video summary!");
        }, 50);
    });
});
