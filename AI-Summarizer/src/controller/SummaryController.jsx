import { SummaryModel } from  "../model/SummaryModel.jsx";
import { SettingsModel } from  "../model/SettingsModel.jsx";

export class SummaryController {
    constructor() {
        this.summaryModel = new SummaryModel();
        this.settingsModel = new SettingsModel();
    }

    getUrl = async () => {
        return (await chrome.tabs.query({active: true, currentWindow: true}))[0].url;
    }

    isVideo = async (testUrl) => {
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
    
    getWebpageContent = async () => {
        const [current] = await chrome.tabs.query({ active: true, currentWindow: true });
        const [webpageContent] = await chrome.scripting.executeScript({
            target: { tabId: current.id },
            func: () => document.documentElement.innerText
        });
            
        return webpageContent.result;
    }

    getWebpageSummary = async () => {
        const webpageContent = (await this.getWebpageContent()) ?? "";
        const provider = (await this.settingsModel.fetchProperty("provider")) ?? "OpenAI";
        const apiKey = (await this.settingsModel.fetchProperty("apiKey" + provider)) ?? "";
        const systemPrompt = (await this.settingsModel.fetchProperty("systemPrompt")) ?? "";
        if (!apiKey) {
            return `API key for ${provider} not found!`;
        }

        switch (provider) {
            case "Anthropic":
                return await this.summaryModel.getSummaryAnthropic(webpageContent, apiKey, systemPrompt);
            case "Google":
                return await this.summaryModel.getSummaryGoogle(webpageContent, apiKey, systemPrompt);
            default:
                return await this.summaryModel.getSummaryOpenAI(webpageContent, apiKey, systemPrompt);
        }
    }

    getVideoSummary = async (url) => {
        const apiKey = (await this.settingsModel.fetchProperty("apiKeyGoogle")) ?? "";
        const systemPrompt = (await this.settingsModel.fetchProperty("systemPrompt")) ?? "";
        if (!apiKey) {
            return `API key for Google not found!`;
        }

        return await this.summaryModel.getSummaryVideo(url, apiKey, systemPrompt);
    }

    getSummary = async () => {
        const url = await this.getUrl();
        if (await this.isVideo(url)) {
            return await this.getVideoSummary(url);
        } else if (!/youtube\.com/.test(url)) {
            return await this.getWebpageSummary();
        } else {
            return "Invalid website!";
        }
    }
}
