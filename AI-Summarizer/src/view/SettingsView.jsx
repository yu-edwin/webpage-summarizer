import { useState } from 'react'
import { SettingsController } from "../controller/SettingsController.jsx"


function ProviderSelector() {

}

function KeyInput() {


}

function SystemPromptInput({ systemPrompt, updateSystemPrompt }) {
    return (
        <input
            type = "text"
            value = { systemPrompt }
            onChange = { (prompt) => updateSystemPrompt(prompt.target.value)}
        />
    )
}


export function SettingsView() {
    const { systemPrompt, updateSystemPrompt,
            provider, updateProvider,
            key, updateKey} = SettingsController();

    return (
        <>
            <div>
                <select
                    value = { provider }
                    onChange = {(option) => updateProvider(option.target.value)}
                >
                    <option value="OpenAI">OpenAI</option>
                    <option value="Anthropic">Anthropic</option>
                    <option value="Google">Google</option>
                </select>
            </div>
            <div>
                <SystemPromptInput
                    systemPrompt={systemPrompt}
                    updateSystemPrompt={updateSystemPrompt}
                />
            </div>
        </>
                    
    )
}
