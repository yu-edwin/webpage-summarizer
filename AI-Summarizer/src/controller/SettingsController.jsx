import { useState, useEffect } from "react"

export function SettingsController() {
    // system prompt and its methods, defaults to ""
    const [systemPrompt, setSystemPrompt] = useState("");
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

    // key and its methods
    const [key, setKey] = useState("");
    const getKey = (val) => {
        return new Promise((resolve) => {
            chrome.storage.sync.get(["key"], (value) => {
                resolve(value.key[val] || "");
            });
        });
    }
    const updateKey = (newKey) => {
        setKey(newKey);
        return new Promise((resolve,reject) => {
            chrome.storage.sync.get(["key"], (out) => {
                out.key[provider] = newKey;
                chrome.storage.sync.set({"key": out.key}, () => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else {
                        resolve();
                    }
                });
            });
        });
    }


    // llm provider and its methods, defaults to "OpenAI"
    const [provider, setProvider] = useState("OpenAI");
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
        getKey(val).then(setKey);
    }

    useEffect(() => {
        getSystemPrompt().then(setSystemPrompt);
        chrome.storage.sync.get(["key"], (value) => {
            if (!value || !value.key) { // no keys found, initialize
                const initKeys = {
                    "OpenAI": "",
                    "Anthropic": "",
                    "Google": ""
                }
                chrome.storage.sync.set({"key": initKeys});
            }
        });
        getProvider().then(setProvider);
        getKey(provider).then(setKey);
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
