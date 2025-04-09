import { useState } from 'react'
import { SettingsController } from "../controller/SettingsController.jsx"

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
            <input
                type = "text"
                value = { key }
                onChange =  {(newKey) => updateKey(newKey.target.value)}
            />
            <div>
                <input
                    type = "text"
                    value = { systemPrompt }
                    onChange = { (prompt) => updateSystemPrompt(prompt.target.value)}
                />
            </div>
        </>
                    
    )
}
