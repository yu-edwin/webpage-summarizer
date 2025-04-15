import { SummaryController } from "../controller/SummaryController.jsx"

export function SummaryView() {
    const { summary } = SummaryController();
    return (
        <div>
            { summary }
        </div> 
    )
}

