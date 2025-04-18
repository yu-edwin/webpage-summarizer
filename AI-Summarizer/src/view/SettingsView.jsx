import { useState, useEffect } from "react"

import { SettingsController } from "../controller/SettingsController.jsx"
import { SettingsModel } from "../model/SettingsModel.jsx"


function ProviderSelector({ value, update, set, setApiKey }) {
    return (
        <select
            value = { value }
            onChange = {async (newProvider) => {
                set(newProvider.target.value);
                const newApiKey = await update(newProvider.target.value);
                setApiKey(newApiKey);
            }}
        >
            <option value="OpenAI">OpenAI</option>
            <option value="Anthropic">Anthropic</option>
            <option value="Google">Google</option>
        </select>
    )
}

function KeyInput({ value, update, set }) {
    return (
        <input
            type="text"
            value={ value }
            onChange={(newApiKey)=>{
                update(newApiKey.target.value);
                set(newApiKey.target.value);
            }}
        />
    )
}

function SystemPromptInput({ value, update, set }) {
    return (
        <input
            type = "text"
            value = { value }
            onChange = {(newSystemPrompt) => {
                update(newSystemPrompt.target.value);
                set(newSystemPrompt.target.value);
            }}
        />
    )
}

export function SettingsView() {
    // const { systemPrompt, updateSystemPrompt,
    //         provider, updateProvider,
    //         key, updateKey } = SettingsController();
    const { updateSystemPrompt,
            updateProvider,
            updateKey,
            getInitialValues } = SettingsController();

    const [ provider, setProvider ] = useState("OpenAI");
    const [ apiKey, setApiKey ] = useState("");
    const [ systemPrompt, setSystemPrompt ] = useState("");
    
    useEffect(() => {
        (async () => {
            const { initialProvider, initialApiKey, initialSystemPrompt } = await getInitialValues();
            setProvider(initialProvider);
            setApiKey(initialApiKey);
            setSystemPrompt(initialSystemPrompt);
        })();

    },[]);

    return (
        <>
            <div>
                <ProviderSelector
                    value={provider}
                    update={updateProvider}
                    set={setProvider}
                    setApiKey={setApiKey}
                />
            </div>
            <div>
                <KeyInput
                    value={apiKey}
                    update={updateKey}
                    set={setApiKey}
                />
            </div>
            <div>
                <SystemPromptInput
                    value={systemPrompt}
                    update={updateSystemPrompt}
                    set={setSystemPrompt}
                />
            </div>
        </>
                    
    )
}
