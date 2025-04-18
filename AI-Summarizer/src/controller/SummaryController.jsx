import { useEffect } from "react"
import Antrhopic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { SummaryModel } from  "../model/SummaryModel.jsx";

export function SummaryController() {
    const { url, setUrl,
            summary, setSummary,
            getVideoSummary } = SummaryModel();
    useEffect(() => {
        getUrl((value) => {
            setUrl(value);
        });
    }, []);

    useEffect(() => {
        getSummary(url);
    }, [url]);

    const getUrl = (callback) => {
        return chrome.tabs.query({active: true, currentWindow: true}, (out) => {
            callback(out[0].url);
        });
    }

    const isVideo = async (testUrl) => {
        const youtube = /youtube\.com/;
        if(youtube.test(testUrl)) {
            try {
                const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(testUrl)}`);
                return response.ok;
            } catch {
                return false;
            }
        } else {
            return false;
        }
    }
    
    const getWebpageContent = () => {}
    const getSummaryOpenAI = () => {}
    const getSummaryAnthropic = () => {}
    const getGoogleSummary = () => {}

    const getSummary = async () => {
        if (await isVideo(url)) {
            await getVideoSummary();
        }
    }

    return {
        summary,
        getUrl,
        isVideo
    }
}
