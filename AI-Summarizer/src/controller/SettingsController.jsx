import { useState, useEffect } from "react"

export function SettingsController() {
    // system prompt and its methods, defaults to ""
    const [systemPrompt, setSystemPrompt] = useState("");
    const getSystemPrompt = () => {
        return new Promise((resolve) => {
            chrome.storage.local.get(["systemPrompt"], (value) => {
                resolve(value || "");
            });
        });
    }
    const updateSystemPrompt = (val) => {
        setSystemPrompt(val);
        chrome.storage.local.set({ "systemPrompt": val });
    }
    useEffect(()=>{
        getSystemPrompt().then(setSystemPrompt);
    },[]);

    // llm provider and its methods, defaults to "OpenAI"
    const [provider, setProvider] = useState("OpenAI");
    useEffect(() => {
        getProvider().then(setProvider);
    },[]);
    const getProvider = () => {
        return new Promise((resolve) => {
            chrome.storage.local.get(["provider"], (value) => {
                resolve(value || "OpenAI");
            });
        });
    };
    const updateProvider = (val) => {
        setProvider(val);
        chrome.storage.local.set({ "provider": val});
    }

    return {
        systemPrompt,
        updateSystemPrompt,
        provider,
        updateProvider
    }
}
