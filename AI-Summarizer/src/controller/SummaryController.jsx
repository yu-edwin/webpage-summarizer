import { useEffect } from "react"
import Antrhopic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { SummaryModel } from  "../model/SummaryModel.jsx";
import { SettingsModel } from "../model/SettingsModel.jsx";

export function SummaryController() {
    const { url, setUrl,
            summary, setSummary,
            getVideoSummary } = SummaryModel();
    useEffect(() => {
        getUrl((value) => {
            // getSummary();
            // setSummary(value);
        });
        // getUrl().then(setUrl);
        // getSummary(url);
    }, []);

    const getUrl = (callback) => {
        return chrome.tabs.query({active: true, currentWindow: true}, (out) => {
            callback(out[0].url);
        });
    }

    const isVideo = () => {
        return true;
        // TODO: some regex thing here
    }
    
    const getSummaryOpenAI = () => {}
    const getSummaryAnthropic = () => {}
    const getGoogleSummary = () => {}

    const getSummary = () => {
        if (isVideo(url)) {
            getVideoSummary();
        }
    }

    return { summary }
}
