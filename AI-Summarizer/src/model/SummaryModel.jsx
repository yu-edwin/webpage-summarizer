import Antrhopic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";



export class SummaryModel {
    getSummaryOpenAI = async () => {}
    getSummaryAnthropic = async () => {}
    getSummaryGoogle = async () => {}
    getSummaryVideo = async (url, apiKey, systemPrompt) => {
        if (!apiKey) {
            return "Failed to configure!";
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
            return "Failed to generate video summarry!";
        }

        return result.text;
    }

}
