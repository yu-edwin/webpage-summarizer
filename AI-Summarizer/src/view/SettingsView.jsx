import { useState, useEffect } from "react"

import { SettingsController } from "../controller/SettingsController.jsx"


/**
 * View element for llm provider selector.
 * @param {string} value: string representing the llm provider
 * @param {Function} update: responsible for updating chrome storage
 * @param {Function} set: setter method for value
 * @param {Function} setApiKey: setter method for the new api key
 * @return {JSX.element} llm provider selector element
 */
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
/**
 * View element for api key input box.
 * @param {string} value: string representing the api key
 * @param {Function} update: responsible for updating chrome storage
 * @param {Function} set: setter method for value
 * @return {JSX.element} key input box element
 */
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

/**
 * View element for system prompt input box.
 * @param {string} value: string representing the system prompt
 * @param {Function} update: responsible for updating chrome storage
 * @param {Function} set: setter method for value
 * @return {JSX.element} system prompt input box element
 */
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

/**
 * View elemnt for the entire settings tab.
 * @retrun {JSX.element} react fragment containing LLM provider selector,
 * API key input box, and system prompt input box
 */
export function SettingsView() {
    const settingsController = new SettingsController();
    const [ provider, setProvider ] = useState("OpenAI");
    const [ apiKey, setApiKey ] = useState("");
    const [ systemPrompt, setSystemPrompt ] = useState("");

    useEffect(() => {
        (async () => {
            const { initialProvider, initialApiKey, initialSystemPrompt } = await settingsController.getInitialValues();
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
                    update={settingsController.updateProvider}
                    set={setProvider}
                    setApiKey={setApiKey}
                />
            </div>
            <div>
                <KeyInput
                    value={apiKey}
                    update={settingsController.updateKey}
                    set={setApiKey}
                />
            </div>
            <div>
                <SystemPromptInput
                    value={systemPrompt}
                    update={settingsController.updateSystemPrompt}
                    set={setSystemPrompt}
                />
            </div>
        </>
                    
    )
}
