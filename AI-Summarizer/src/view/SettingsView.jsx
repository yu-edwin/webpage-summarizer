import { useState } from 'react'
import { SettingsController } from "../controller/SettingsController.jsx"

export function SettingsView() {
    const { systemPrompt, updateSystemPrompt, provider, updateProvider} = SettingsController();

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
        </>
                    
    )
}
    // return (
    //     <>
    //         <div>
    //             <select
    //                 value = { provider }
    //                 onChange = {(option) => updateProvider(option.target.value)}
    //             >
    //                 <option value="OpenAI">OpenAI</option>
    //                 <option value="Anthropic">Anthropic</option>
    //                 <option value="Google">Google</option>
    //             </select>
    //         </div>
    //         <div>
    //             chosen: {provider}
    //         </div>
    //         <div>
    //             <input
    //                 type="text"
    //                 value = { systemPrompt }
    //                 onChange= { (prompt) => updateSystemPrompt(prompt) }
    //             />
    //         </div>
    //     </>
    // )

// }
