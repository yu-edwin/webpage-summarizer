import { useState } from 'react'
import { updateSystemPrompt } from "../controller/SettingsController.jsx"

export function SettingsView() {
    const [provider, setProvider]= useState("OpenAI");

    return (
        <>
            <div>
                <select
                    value = {provider}
                    onChange = {(option) => setProvider(option.target.value)}
                >
                    <option value="OpenAI">OpenAI</option>
                    <option value="Anthropic">Anthropic</option>
                    <option value="Google">Google</option>
                </select>
            </div>
            <div>
                chosen: {provider}
            </div>
            <div>
                <input
                    type="text"
                    onChange={(prompt) => updateSystemPrompt(prompt)}
                >
                    154329
                </input>
            </div>
        </>
    )

}
