import { useState, useEffect } from "react";
import { SummaryController } from "../controller/SummaryController.jsx"


export function SummaryView() {
    const [ summary, setSummary ] = useState("Generating summary...");
    const summaryController = new SummaryController();

    useEffect(() => {
        (async () => {
            setSummary(await summaryController.getSummary());
        })();
    },[]);
    return (
        <div data-testid="SummaryView test">
            { summary }
        </div> 
    )
}
