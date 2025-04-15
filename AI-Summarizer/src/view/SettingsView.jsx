import { SettingsController } from "../controller/SettingsController.jsx"
import { SettingsModel } from "../model/SettingsModel.jsx"


function ProviderSelector({ value, update}) {
    return (
        <select
            value = { value }
            onChange = {(option) => update(option.target.value)}
        >
            <option value="OpenAI">OpenAI</option>
            <option value="Anthropic">Anthropic</option>
            <option value="Google">Google</option>
        </select>
    )
}

function KeyInput({ value, update }) {
    return (
        <input
            type="text"
            value={ value}
            onChange={(newKey)=>update(newKey.target.value)}
        />
    )
}

function SystemPromptInput({ value, update }) {
    return (
        <input
            type = "text"
            value = { value }
            onChange = { (prompt) => update(prompt.target.value)}
        />
    )
}

export function SettingsView() {
    const { updateSystemPrompt,
            updateProvider,
            updateKey } = SettingsController();
    const { provider,
            key,
            systemPrompt } = SettingsModel();

    return (
        <>
            <div>
                <ProviderSelector
                    value={provider}
                    update={updateProvider}
                />
            </div>
            <div>
                <KeyInput
                    value={key}
                    update={updateKey}
                />
            </div>
            <div>
                <SystemPromptInput
                    value={systemPrompt}
                    update={updateSystemPrompt}
                />
            </div>
        </>
                    
    )
}
