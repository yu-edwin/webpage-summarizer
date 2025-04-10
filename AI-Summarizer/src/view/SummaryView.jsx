import { SummaryController } from "../controller/SummaryController.jsx"

export function SummaryView() {
    const {Summary} = SummaryController();
    return (
        <>
            <div>
                <Summary />
            </div> 
        </>
    )
}

