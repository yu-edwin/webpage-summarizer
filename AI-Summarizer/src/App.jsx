import { useState } from 'react'
import './App.css'
import { SettingsView } from "./view/SettingsView.jsx"
import { SummaryView } from "./view/SummaryView.jsx"

function App() {
    const [tab, setTab] = useState("summary");

    return (
        <>
            <div>
                <label>
                    <input
                        type="radio"
                        name="tabs"
                        checked={tab === "summary"}
                        onChange={() => setTab("summary")}
                        value="summary"
                    />
                    Summary
                </label> 
                <label>
                    <input
                        type="radio"
                        name="tabs"
                        checked={tab === "settings"}
                        onChange={() => setTab("settings")}
                        value="settings"
                    />
                    Settings
                </label> 
            </div>
            <h1>AI summarizer</h1>
            <div className="card">
                {tab === "settings" && <SettingsView />}
                {tab === "summary" && <SummaryView />}
            </div>
        </>
    )
}

export default App
