import { SettingsModel } from "../model/SettingsModel.jsx"

export function SettingsController() {
    const {systemPrompt,
            setSystemPrompt,
            key,
            setKey,
            provider,
            setProvider,
            getProperty,
            saveProperty} = SettingsModel();

    const updateSystemPrompt = (newSystemPrompt) => {
        setSystemPrompt(newSystemPrompt);
        saveProperty("systemPrompt", newSystemPrompt);
    }

    const updateKey = (newKey) => {
        setKey(newKey);
        saveProperty("key"+provider, newKey);
    }

    const updateProvider = (newProvider) => {
        setProvider(newProvider);
        saveProperty("provider", newProvider);
        getProperty("key"+newProvider).then(setKey);
    }

    return {
        systemPrompt,
        updateSystemPrompt,
        provider,
        updateProvider,
        key,
        updateKey
    }
}
