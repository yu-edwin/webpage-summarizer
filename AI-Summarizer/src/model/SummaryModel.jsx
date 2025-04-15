import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SettingsModel } from "../model/SettingsModel.jsx";



export function SummaryModel() {
    const {provider, key, systemPrompt, fetchProperty} = SettingsModel();
    const [url, setUrl] = useState(undefined)
    const [status, setStatus] = useState(undefined);
    const [summary, setSummary] = useState(undefined);




    const getVideoSummary = async () => {
        let model;
        try {
            let genAI;
            await fetchProperty("keyGoogle").then((value) => {
                genAI = new GoogleGenerativeAI(value);
            });
            await fetchProperty("systemPrompt").then((value) => {
                model = genAI.getGenerativeModel({
                    model: "gemini-2.0-flash",
                    systemInstruction: {
                        parts: [{ text: value}],
                        role: "model"
                    }
                });
            });
        } catch {
            setSummary(`Failed to configure!`);
            return;
        }

        setSummary(`Generating summary ... `);
        let result;
        try {
            result = await model.generateContent([
                "Summarize this video: ",
                {
                    fileData: {
                        fileUri: url,
                    },
                },
            ]);
        } catch {
            setSummary(`Failed to generate video summary!`);
            return;
        }
        setSummary(await result.response.text());
    }

    return {
        status, setStatus,
        summary, setSummary,
        url, setUrl,
        getVideoSummary
    }
}
