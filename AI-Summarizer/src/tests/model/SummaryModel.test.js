import { describe, it, expect, beforeAll, beforeEach, vi} from "vitest";

// mocking implementations for OpenAI, Anthropic, Google
vi.mock("@google/genai", async () =>{
    const mocks = await import("../mocks.js");
    return {
        GoogleGenAI: vi.fn().mockImplementation((param) => new mocks.mockGoogle(param)),
        OpenAI: vi.fn().mockImplementation(() => new mocks.mockOpenAI),
        Anthropic: vi.fn().mockImplementation(() => new mocks.mockAnthropic),
    }
});

import { SummaryModel } from "../../model/SummaryModel.jsx";
import { GoogleGenAI } from "@google/genai";
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
    // it("tests getting webpage summary with valid webpage and valid key using OpenAI", async () => {
    //     const summaryModel = new SummaryModel();
    //     const summary = await summaryModel.getSummaryOpenAI(links.validWebsite, keys.valid);
    //     setTimeout(() => {
    //         expect(mockOpenAI).toHaveBeenCalledWith({ apiKey: keys.valid });
    //         expect(summary).toEqual("correct summary");
    //     }, 50);
    // });

    // it("tests getting webpage summary with  invalid key using OpenAI", async () => {
    //     const summaryModel = new SummaryModel();
    //     const summary = await summaryModel.getSummaryOpenAI(links.validWebsite, keys.invalid);
    //     setTimeout(() => {
    //         expect(mockOpenAI).toHaveBeenCalledWith({ apiKey: keys.invalid });
    //         expect(summary).toEqual("Failed to configure!");
    //     }, 50);
    // });

    // it("tests getting webpage summary with invalid webpage using OpenAI", async () => {
    //     const summaryModel = new SummaryModel();
    //     const summary = await summaryModel.getSummaryOpenAI(links.invalidWebsite, keys.valid);
    //     setTimeout(() => {
    //         expect(mockOpenAI).toHaveBeenCalledWith({ apiKey: keys.invalid });
    //         expect(summary).toEqual("Failed to generate video summary!");
    //     }, 50);
    // });


    


    // it("tests getting webpage summary with valid webpage and valid key using Anthropic", async () => {
    //     const summaryModel = new SummaryModel();
    //     const summary = await summaryModel.getSummaryAnthropic(links.validWebsite, keys.valid);
    //     setTimeout(() => {
    //         expect(mockAnthropic).toHaveBeenCalledWith({ apiKey: keys.valid });
    //         expect(summary).toEqual("correct summary");
    //     }, 50);
    // });

    // it("tests getting webpage summary with  invalid key using Anthropic", async () => {
    //     const summaryModel = new SummaryModel();
    //     const summary = await summaryModel.getSummaryAnthropic(links.validWebsite, keys.invalid);
    //     setTimeout(() => {
    //         expect(mockAnthropic).toHaveBeenCalledWith({ apiKey: keys.invalid });
    //         expect(summary).toEqual("Failed to configure!");
    //     }, 50);
    // });

    // it("tests getting webpage summary with invalid webpage using Anthropic", async () => {
    //     const summaryModel = new SummaryModel();
    //     const summary = await summaryModel.getSummaryAnthropic(links.invalidWebsite, keys.valid);
    //     setTimeout(() => {
    //         expect(mockAnthropic).toHaveBeenCalledWith({ apiKey: keys.invalid });
    //         expect(summary).toEqual("Failed to generate video summary!");
    //     }, 50);
    // });
    





    it("tests getting webpage summary with valid webpage and valid key using Google", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryGoogle("correct input", keys.valid, "");
        expect(GoogleGenAI).toHaveBeenCalledWith({ apiKey: keys.valid });
        expect(summary).toEqual("correct summary");
    });

    it("tests getting webpage summary with invalid key using Google", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryGoogle("correct input", keys.invalid, "");
        expect(GoogleGenAI).toHaveBeenCalledWith({ apiKey: keys.invalid });
        expect(summary).toEqual("Failed to generate video summary!");
    });

    it("tests getting webpage summary with missing key using Google", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryGoogle("correct input", keys.missing, "");
        expect(summary).toEqual("Missing API key!");
    });

    it("tests getting webpage summary with invalid webpage using Google", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryGoogle("wrong input", keys.valid, "");
        expect(GoogleGenAI).toHaveBeenCalledWith({ apiKey: keys.invalid });
        expect(summary).toEqual("Failed to generate video summary!");
    });




    it("tests getting video summary with valid link and valid key", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryVideo(links.validVideo, keys.valid, "");
        expect(GoogleGenAI).toHaveBeenLastCalledWith({ apiKey: keys.valid });
        expect(summary).toEqual("correct summary");
    });

    it("tests getting video summary with invalid key", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryVideo(links.validVideo, keys.invalid, "");
        expect(GoogleGenAI).toHaveBeenLastCalledWith({ apiKey: keys.invalid });
        expect(summary).toEqual("Failed to generate video summary!");
    });

    it("tests getting video summary with missing key", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryVideo(links.validVideo, keys.missing, "");
        expect(summary).toEqual("Missing API key!");
    });

    it("tests getting video summary with invalid link", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryVideo(links.invalidVideo, keys.valid, "");
        expect(GoogleGenAI).toHaveBeenLastCalledWith({ apiKey: keys.valid });
        expect(summary).toEqual("Failed to generate video summary!");
    });
});
