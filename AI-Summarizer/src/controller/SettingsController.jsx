import { SettingsModel } from "../model/SettingsModel.jsx"

export function SettingsController() {
    const {setSystemPrompt,
            setKey,
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
            storeProperty("key"+provider, newKey);
        });
    }

    const updateProvider = (newProvider) => {
        setProvider(newProvider);
        storeProperty("provider", newProvider);
        fetchProperty("key"+newProvider).then(setKey);
    }

    return {
        updateProvider,
        updateKey,
        updateSystemPrompt
    }
}
