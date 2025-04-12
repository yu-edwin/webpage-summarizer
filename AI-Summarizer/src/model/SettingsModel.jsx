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
    const getProperty = (x) => {
        return new Promise((resolve) => {
            chrome.storage.sync.get([x], (value) => {
                resolve(value[x]);
            });
        });
    }

    useEffect(() => {
        // retrieve variables and initialize
        // getProperty("SystemPrompt").then(setSystemPrompt);
        // getProperty("provider").then((storedProvider) => {
        //     if (storedProvider === undefined) {
        //         storedProvider = "OpenAI"
        //     }
        //     setProvider(storedProvider);
        //     getProperty("key" + storedProvider).then(setKey);
        // });
    }, []);

    return {
        systemPrompt, setSystemPrompt,
        key, setKey,
        provider, setProvider,
        getProperty, saveProperty
    }
}
