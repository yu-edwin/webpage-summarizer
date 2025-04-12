import { useEffect } from "react"
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

    const updateSystemPrompt = (val) => {
        setSystemPrompt(val);
        chrome.storage.sync.set({ "systemPrompt": val });
    }

    const updateKey = (newKey) => {
        setKey(newKey);
        chrome.storage.sync.set({ ["key"+provider]: newKey });
    }

    const updateProvider = (newProvider) => {
        setProvider(newProvider);
        chrome.storage.sync.set({ "provider": newProvider});
        getProperty("key"+newProvider).then(setKey);
    }

    useEffect(() => {
        getProperty("systemPrompt").then(setSystemPrompt);
        getProperty("provider").then((storedProvider) => {
            setProvider(storedProvider);
            getProperty("key"+storedProvider).then(setKey);
        });
    },[]);
    return {
        systemPrompt,
        updateSystemPrompt,
        provider,
        updateProvider,
        key,
        updateKey
    }
}
