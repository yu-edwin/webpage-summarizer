import { useState, useEffect } from "react";
import { SummaryController } from "../controller/SummaryController.jsx"

/**
 * View element for the summary tab.
 * @return {JSX.element} react element showing the summary of webpage/video.
 */
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
