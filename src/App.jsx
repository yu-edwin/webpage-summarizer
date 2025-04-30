import React, { useState, lazy, Suspense } from 'react';
import './App.css';

const SettingsView = lazy(() => import("./view/SettingsView.jsx"));
const SummaryView = lazy(() => import("./view/SummaryView.jsx"));

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
                <Suspense fallback={<div>Loading...</div>}>
                    {tab === "settings" && <SettingsView />}
                    {tab === "summary" && <SummaryView />}
                </Suspense>
            </div>
        </div>
    )
}

export default App;
