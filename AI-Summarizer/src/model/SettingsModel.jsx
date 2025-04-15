import { useState, useEffect } from "react"

/**
 * store: saving to persistent storage
 * fetch: load from persistent storage
 * setters: sets variable within runtime
 * getters (the properties themselves): gets variable within runtime 
 */
export function SettingsModel() {
    const [systemPrompt, setSystemPrompt] = useState("");
    const [key, setKey] = useState("");
    const [provider, setProvider] = useState("OpenAI");

    /**
     * stores given value to [x] within chrome.storage.sync
     */
    const storeProperty = (x, value) => {
        chrome.storage.sync.set({ [x]: value });
    }

    /**
     * Retrieves any previously stored variable from chrome.stroage.sync
     * If property is not found, it defaults to "".
     */
    const fetchProperty = (x) => {
        return new Promise((resolve) => {
            chrome.storage.sync.get([x], (value) => {
                resolve(value[x]);
            });
        });
    }

    useEffect(() => {
        fetchProperty("systemPrompt").then(setSystemPrompt);
        fetchProperty("provider").then((storedProvider) => {
            setProvider(storedProvider ?? "OpenAI");
            fetchProperty("key"+storedProvider).then(setKey);
        });
    }, []);

    return {
        provider, setProvider,
        key, setKey,
        systemPrompt, setSystemPrompt,
        fetchProperty, storeProperty
    }
}
