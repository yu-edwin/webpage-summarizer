import { SettingsModel } from "../model/SettingsModel.jsx"

export function SettingsController() {
    const {
        fetchProperty,
        storeProperty} = SettingsModel();

    const updateSystemPrompt = (newSystemPrompt) => {
        storeProperty("systemPrompt", newSystemPrompt);
    }

    const updateKey = (newApiKey) => {
        fetchProperty("provider").then((provider) => {
            storeProperty("apiKey"+(provider ?? "OpenAI"), newApiKey);
        });
    }

    const updateProvider = async (newProvider) => {
        storeProperty("provider", newProvider ?? "OpenAI");
        return (await fetchProperty("apiKey" + newProvider) ?? "");
    }
    
    const getInitialValues = async () => {
        const provider = await fetchProperty("provider") ?? "OpenAI";
        const apiKey = await fetchProperty("apiKey" + provider) ?? "";
        const systemPrompt = await fetchProperty("systemPrompt") ?? "";
        return {
            initialProvider: provider,
            initialApiKey: apiKey,
            initialSystemPrompt: systemPrompt
        }
    }
    return {
        updateProvider,
        updateKey,
        updateSystemPrompt,
        getInitialValues
    }
}
// export function SettingsController() {
//     const {
//         systemPrompt,
//         setSystemPrompt,
//         key,
//         setKey,
//         provider,
//         setProvider,
//         fetchProperty,
//         storeProperty} = SettingsModel();

//     const updateSystemPrompt = (newSystemPrompt) => {
//         setSystemPrompt(newSystemPrompt);
//         storeProperty("systemPrompt", newSystemPrompt);
//     }

//     const updateKey = (newKey) => {
//         setKey(newKey);
//         fetchProperty("provider").then((provider) => {
//             storeProperty("key"+(provider ?? "OpenAI"), newKey);
//         });
//     }

//     const updateProvider = async (newProvider) => {
//         setProvider(newProvider);
//         storeProperty("provider", newProvider ?? "OpenAI");
//         setKey(await fetchProperty("key"+newProvider) ?? "");
//     }

//     return {
//         provider,
//         updateProvider,
//         key,
//         updateKey,
//         systemPrompt,
//         updateSystemPrompt
//     }
// }
