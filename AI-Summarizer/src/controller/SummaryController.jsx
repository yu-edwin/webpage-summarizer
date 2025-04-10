import useEffect from "react"
import Antrhopic from "@anthropic-ai/sdk";
import OpenAI from "openai";


export function SummaryController() {
    useEffect(() => {
        getUrl();
    }, []);

    const getUrl = () => {
        return new Promise((resolve) => {
            chrome.tabs.query({active: true, currentWindow: true}, (url) => {
                resolve();
            });
        });
    }

    const isVideo = () => {};
    
    const getSummaryOpenAI = () => {};
    const getSummaryAnthropic = () => {};
    const getGoogleSummary = () => {};
    const summary = () => {
        var prompt;
        getUrl().then((url) => {
        });
    };


    return {
        summary
    }
}
