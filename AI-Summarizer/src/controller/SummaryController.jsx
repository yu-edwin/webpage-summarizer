import useEffect from "react"


export function SummaryController() {
    const [url, setUrl] = useState("")
    useEffect(() => {
        getUrl();
    }, []);
    const getUrl = () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs && tabs[0]) {
                setUrl(tabs[0].url);
            }
        });
    };

    const getSummaryOpenAI = () => {};
    const getSummaryAnthropic = () => {};
}
