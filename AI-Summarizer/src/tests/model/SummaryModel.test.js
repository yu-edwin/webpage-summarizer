import { describe, it, expect, vi} from "vitest";

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

import { SummaryModel } from "../../model/SummaryModel.jsx";
import { GoogleGenAI } from "@google/genai";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { links, keys } from "../mocks.js";


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
        const summary = await summaryModel.getSummaryOpenAI("correct input", keys.valid, "");
        expect(OpenAI).toHaveBeenLastCalledWith({ apiKey: keys.valid });
        expect(summary).toEqual("correct summary");
    });

    it("tests getting webpage summary with invalid key using OpenAI", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryOpenAI("correct input", keys.invalid, "");
        expect(OpenAI).toHaveBeenLastCalledWith({ apiKey: keys.invalid });
        expect(summary).toEqual("Failed to generate webpage summary!");
    });

    it("tests getting webpage summary with missing key using OpenAI", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryOpenAI("correct input", keys.missing, "");
        expect(summary).toEqual("Missing API key!");
    });

    it("tests getting webpage summary with invalid webpage using OpenAI", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryOpenAI(links.invalidWebsite, keys.valid, "");
        expect(OpenAI).toHaveBeenLastCalledWith({ apiKey: keys.valid });
        expect(summary).toEqual("Failed to generate webpage summary!");
    });


    it("tests getting webpage summary with valid webpage and valid key using Anthropic", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryAnthropic("correct input", keys.valid, "");
        expect(Anthropic).toHaveBeenLastCalledWith({ apiKey: keys.valid });
        expect(summary).toEqual("correct summary");
    });

    it("tests getting webpage summary with invalid key using Anthropic", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryAnthropic("correct input", keys.invalid, "");
        expect(Anthropic).toHaveBeenLastCalledWith({ apiKey: keys.invalid });
        expect(summary).toEqual("Failed to generate webpage summary!");
    });

    it("tests getting webpage summary with missing key using Anthropic", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryAnthropic("correct input", keys.missing, "");
        expect(summary).toEqual("Missing API key!");
    });

    it("tests getting webpage summary with invalid webpage using Anthropic", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryAnthropic("wrong input", keys.valid, "");
        expect(Anthropic).toHaveBeenLastCalledWith({ apiKey: keys.valid });
        expect(summary).toEqual("Failed to generate webpage summary!");
    });


    it("tests getting webpage summary with valid webpage and valid key using Google", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryGoogle("correct input", keys.valid, "");
        expect(GoogleGenAI).toHaveBeenLastCalledWith({ apiKey: keys.valid });
        expect(summary).toEqual("correct summary");
    });

    it("tests getting webpage summary with invalid key using Google", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryGoogle("correct input", keys.invalid, "");
        expect(GoogleGenAI).toHaveBeenLastCalledWith({ apiKey: keys.invalid });
        expect(summary).toEqual("Failed to generate webpage summary!");
    });

    it("tests getting webpage summary with missing key using Google", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryGoogle("correct input", keys.missing, "");
        expect(summary).toEqual("Missing API key!");
    });

    it("tests getting webpage summary with invalid webpage using Google", async () => {
        const summaryModel = new SummaryModel();
        const summary = await summaryModel.getSummaryGoogle("wrong input", keys.valid, "");
        expect(GoogleGenAI).toHaveBeenLastCalledWith({ apiKey: keys.valid });
        expect(summary).toEqual("Failed to generate webpage summary!");
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
