import { SettingsModel } from "../model/SettingsModel.jsx"

export function SettingsController() {
    const {
        systemPrompt,
        setSystemPrompt,
        key,
        setKey,
        provider,
        setProvider,
        fetchProperty,
        storeProperty} = SettingsModel();

    const updateSystemPrompt = (newSystemPrompt) => {
        setSystemPrompt(newSystemPrompt);
        storeProperty("systemPrompt", newSystemPrompt);
    }

    const updateKey = (newKey) => {
        setKey(newKey);
        fetchProperty("provider").then((provider) => {
            storeProperty("key"+(provider ?? "OpenAI"), newKey);
        });
    }

    const updateProvider = async (newProvider) => {
        setProvider(newProvider);
        storeProperty("provider", newProvider ?? "OpenAI");
        setKey(await fetchProperty("key"+newProvider) ?? "");
    }

    return {
        provider,
        updateProvider,
        key,
        updateKey,
        systemPrompt,
        updateSystemPrompt
    }
}
