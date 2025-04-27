AI Webpage Summary Chrome Extension
A Google Chrome extension that generates AI summaries of webpages and YouTube  videos using LLMs. Currently Supports 

Installation

```bash
git clone 
cd webpage-summarizer
npm install
npm run build
```

This will build the extension into `dist/`. Then to load the extension in Google Chrome:
1. Open your browser and go to `chrome://extensions`
2. Enable developer mode
3. Choose load unpacked
4. Select the `dist/` to load the extension

Configuration
To set up the plugin:
1. Click on the icon to open up the pop-up
2. Go to settings tab and set the API keys
    - Currently Supports OpenAI, Anthropic (Claude), and Google (Gemini)

