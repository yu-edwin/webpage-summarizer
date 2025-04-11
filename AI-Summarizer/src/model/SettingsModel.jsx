import { useState, useEffect } from "react"

export function SettingsModel() {
    // initializing provider, key, system propmts
    const [systemPrompt, setSystemPrompt] = useState("");
    const [key, setKey] = useState("");
    const [provider, setProvider] = useState("OpenAI");

    /**
     * Saves given value to [x] within chrome.storage.sync
     */
    const saveProperty = (x, value) => {
        chrome.storage.set({ [x]: value });
    }

    /**
     * Retrieves any previously saved variable from chrome.stroage.sync
     * If property is not found, it defaults to "".
     */
    const getProperty = (x, defaultValue) => {
        return new Promise((resolve) => {
            chrome.storage.sync.get({ [x]: defaultValue }, (value) => {
                resolve(value[x]);
            });
        });
    }

    useEffect(() => {
        // retrieve variables, if previously set
        getProperty("SystemPrompt", "").then((storedSystemPrompt) => {
            setSystemPrompt(storedSystemPrompt);
        });
        getProperty("provider", "OpenAI").then((storedProvider) => {
            setProvider(storedProvider);
            getProperty("key", "").then(setKey);
        });

    }, []);


}
