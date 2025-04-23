import { SettingsModel } from "../model/SettingsModel.jsx"


/**
 * Controller class for settings.
 * Responsible for updating and retrieving values in
 * user's associated chrome storage.
 */
export class SettingsController{
    /**
     * constructor for SettingsController,
     * initializes SettingsModel.
     */
    constructor() {
        this.settingsModel = new SettingsModel();
    };

    /**
     * Updates user's system prompt in their chrome storage.
     * @param {string} newSystemPrompt: new user system prompt
     */
    updateSystemPrompt = (newSystemPrompt) => {
        this.settingsModel.storeProperty("systemPrompt", newSystemPrompt);
    }

    /**
     * Updates user's system prompt in their chrome storage.
     * @param {string} newApiKey: newly given api key
     */
    updateKey = (newApiKey) => {
        this.settingsModel.fetchProperty("provider").then((provider) => {
            this.settingsModel.storeProperty("apiKey"+(provider ?? "OpenAI"), newApiKey);
        });
    }

    /**
     * Asynchronously updates user's system prompt in their chrome storage.
     * @param {string} newProvider: newly selected provider
     * @return {string} previously used api for the new provider, "" if not found
     */
    updateProvider = async (newProvider) => {
        this.settingsModel.storeProperty("provider", newProvider ?? "OpenAI");
        return (await this.settingsModel.fetchProperty("apiKey" + newProvider) ?? "");
    }
    
    /**
     * Asynchronously retrieves user's data from previous sessions (if any).
     * @return {string} initialProvider: previously used provider, "OpenAI" if not found
     * @return {string} initialApiKey: previous used api key, "" if not found
     * @return {string} initialSystemPrompt: previously used system prompt, "" if not found
     */
    getInitialValues = async () => {
        const provider = (await this.settingsModel.fetchProperty("provider")) ?? "OpenAI";
        const apiKey = (await this.settingsModel.fetchProperty("apiKey" + provider)) ?? "";
        const systemPrompt = (await this.settingsModel.fetchProperty("systemPrompt")) ?? "";
        return {
            initialProvider: provider,
            initialApiKey: apiKey,
            initialSystemPrompt: systemPrompt
        }
    }
}
