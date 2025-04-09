import { useState, useEffect } from "react"

export function SettingsController() {
    // system prompt and its methods, defaults to ""
    const [systemPrompt, setSystemPrompt] = useState("");
    useEffect(()=>{
        getSystemPrompt().then(setSystemPrompt);
    },[]);
    const getSystemPrompt = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get(["systemPrompt"], (value) => {
                resolve(value.systemPrompt || "");
            });
        });
    }
    const updateSystemPrompt = (val) => {
        setSystemPrompt(val);
        chrome.storage.sync.set({ "systemPrompt": val });
    }

    // llm provider and its methods, defaults to "OpenAI"
    const [provider, setProvider] = useState("OpenAI");
    useEffect(() => {
        getProvider().then(setProvider);
    },[]);
    const getProvider = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get(["provider"], (value) => {
                resolve(value.provider || "OpenAI");
            });
        });
    };
    const updateProvider = (val) => {
        setProvider(val);
        chrome.storage.sync.set({ "provider": val});
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
