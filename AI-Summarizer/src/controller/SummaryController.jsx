import { SummaryModel } from  "../model/SummaryModel.jsx";
import { SettingsModel } from  "../model/SettingsModel.jsx";

/**
 * Controller class for summary.
 * Responsible for getting summary from the
 * designated LLM provider.
 */
export class SummaryController {
    /**
     * constructor for SettingsModel.
     * initializes SettingsModel and SummaryModel.
     */
    constructor() {
        this.summaryModel = new SummaryModel();
        this.settingsModel = new SettingsModel();
    }

    /**
     * Asynchronously gets the url of the user's current tab.
     * @return {string} string representing user's current tab url.
     */
    getUrl = async () => {
        return (await chrome.tabs.query({active: true, currentWindow: true}))[0].url;
    }

    /**
     * Asynchronously hecks if a particular link is a valid YouTube video.
     * @param {string} testUrl: url to test for
     * @return {boolean} true if the url is a valid YouTube video, false otherwise
     */ 
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

    /**
     * Asynchronous ets the current webpages's website content.
     * @return {string} string containing the current website's contents
     */
    getWebpageContent = async () => {
        const [current] = await chrome.tabs.query({ active: true, currentWindow: true });
        const [webpageContent] = await chrome.scripting.executeScript({
            target: { tabId: current.id },
            func: () => document.documentElement.innerText
        });
            
        return webpageContent.result;
    }

    /**
     * Asynchronous function for getting webpage summary,
     * using either OpenAI, Anthropic, or Google.
     * @return {string} string containing the summnary of the curretn webpage
     */
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

    /**
     * Asynchronous function for getting summary for
     * a YouTube video, using Google's Gemini.
     * @return {string} string containing video summary
     */
    getVideoSummary = async (url) => {
        const apiKey = (await this.settingsModel.fetchProperty("apiKeyGoogle")) ?? "";
        const systemPrompt = (await this.settingsModel.fetchProperty("systemPrompt")) ?? "";
        if (!apiKey) {
            return `API key for Google not found!`;
        }

        return await this.summaryModel.getSummaryVideo(url, apiKey, systemPrompt);
    }

    /**
     * Asynchronous function to get summary,
     * responisble for checking which category of website
     * (webpage, YouTube video, invalid), then calls the
     * corresponding function.
     * @return {string} string containing the summary
     */
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
