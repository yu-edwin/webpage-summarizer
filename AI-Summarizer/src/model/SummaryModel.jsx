import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SettingsModel } from "../model/SettingsModel.jsx";



export function SummaryModel() {
    const {provider, key, systemPrompt} = SettingsModel();
    const [url, setUrl] = useState(undefined)
    const [status, setStatus] = useState(undefined);
    const [summary, setSummary] = useState(undefined);




    const getVideoSummary = async () => {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
            systemInstruction: {
                parts: systemPrompt,
                role: "model"
            }
        });
        const result = await model.generateContent([
            "Can you summarize this video?",
            {
                fileData: {
                    fileUri: "https://www.youtube.com/watch?v=5zQ0WewZY50",
                },
            },
        ]);
        setSummary(result.response.text());
    }

    return {
        status, setStatus,
        summary, setSummary,
        getVideoSummary
    }
}
