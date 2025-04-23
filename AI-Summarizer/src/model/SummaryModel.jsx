import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";



export class SummaryModel {
    getSummaryOpenAI = async (webpageContent, apiKey, systemPrompt) => {
        if (!apiKey) {
            return "Missing API key!";
        }

        let openai;
        try {
            openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });
        } catch {
            return "Failed to configure!";
        }

        let result;
        try {
            result = await openai.responses.create({
                model: "gpt-4.1-nano",
                instructions: "You are an AI webpage summarizer, summarize the contents of this webpage. "
                    + systemPrompt,
                input: webpageContent
            });
            console.log(result);
        } catch {
            return "Failed to generate webpage summary!";
        }

        return result.output_text;
    }

    getSummaryAnthropic = async (webpageContent, apiKey, systemPrompt) => {
        if (!apiKey) {
            return "Missing API key!";
        }

        let anthropic;
        try {
            anthropic = new Anthropic({ apiKey: apiKey, dangerouslyAllowBrowser: true });
        } catch {
            return "Failed to configure!";
        }

        let result;
        try {
            result = await anthropic.messages.create({
                model:"claude-3-haiku-20240307",
                max_tokens: 1024,
                system:"You are an AI webpage summarizer, summarize the contents of this webpage. "
                    + systemPrompt,
                messages: [{
                    role: "user",
                    content: webpageContent
                }]
            });
        } catch {
            return "Failed to generate webpage summary!";
        }

        return result.content[0].text;
    }

    getSummaryGoogle = async (webpageContent, apiKey, systemPrompt) => {
        if (!apiKey) {
            return "Missing API key!";
        }

        let genAI;
        try {
            genAI = new GoogleGenAI({ apiKey: apiKey });
        } catch {
            return "Failed to configure!";
        }

        let result;
        try {
            result = await genAI.models.generateContent({
                model: "gemini-2.0-flash",
                config: {
                    systemInstruction: "You are an AI webpage summarizer, summarize the contents of this webpage. "
                        + systemPrompt
                },
                contents: webpageContent
            });
        } catch {
            return "Failed to generate webpage summary!";
        }

        return result.text;
    }

    /**
     * method for getting video summary using Google's Gemini.
     * @param {string} url: YouTube link to video
     * @param {string} apiKey: user API key for Google
     * @param {string} systemPrompt: user's designated system prompt
     * @return {string} resulting video summary, or error message.
     */
    getSummaryVideo = async (url, apiKey, systemPrompt) => {
        if (!apiKey) {
            return "Missing API key!";
        }

        let genAI;
        try {
            genAI = new GoogleGenAI({ apiKey: apiKey });
        } catch {
            return "Failed to configure!";
        }

        let result;
        try {
            result = await genAI.models.generateContent({
                model: "gemini-2.0-flash",
                config: {
                    systemInstruction: "You are an AI video summarizer, summarize this video. " + systemPrompt
                },
                contents: {
                    fileData: {
                        fileUri: url,
                    }
                }
            });
        } catch {
            return "Failed to generate video summary!";
        }

        return result.text;
    }
}
