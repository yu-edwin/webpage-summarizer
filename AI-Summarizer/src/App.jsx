import { useState } from 'react'
import './App.css'
import { SettingsView } from "./view/SettingsView.jsx"
import { SummaryView } from "./view/SummaryView.jsx"

/**
 * View element representing the whole app,
 * also manages the tab state.
 * @return {JSX.element} element for the app
 */
function App() {
    const [tab, setTab] = useState("summary");

    return (
        <div>
            <div className="d-flex">
                <input
                    type="radio"
                    className="btn-check"
                    name="radio"
                    id="option1"
                    autoComplete="off"
                    checked={tab === "summary"}
                    onChange={() => setTab("summary")}
                    defaultChecked
                />
                <label className="btn flex-fill" htmlFor="option1">
                    Summary
                </label>

                <input
                    type="radio"
                    className="btn-check"
                    name="radio"
                    id="option2"
                    autoComplete="off"
                    checked={tab === "settings"}
                    onChange={() => setTab("settings")}
                />
                <label className="btn flex-fill" htmlFor="option2">
                    Settings
                </label>
            </div>
            <div className="card">
                {tab === "settings" && <SettingsView />}
                {tab === "summary" && <SummaryView />}
            </div>
        </div>
    )
}

export default App;

{/* <div>
<label class="radio">
    <input
        type="radio"
        name="radio"
        checked={tab === "summary"}
        onChange={() => setTab("summary")}
        value="summary"

    />
    <span class="name">Summary</span>
</label> 
<label class="radio">
    <input
        type="radio"
        name="radio"
        checked={tab === "settings"}
        onChange={() => setTab("settings")}
        value="settings"
    />
    <span class="name">Settings</span>
</label> 
</div>
<h1 className='mt-16'>AI summarizer</h1>
<div className="card">
{tab === "settings" && <SettingsView />}
{tab === "summary" && <SummaryView />}
</div> */}