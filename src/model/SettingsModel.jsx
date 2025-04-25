
/**
 * Model class for settings.
 * Responsible for fetching and storing
 * values to the chrome.storage api.
 */
export class SettingsModel{
    /**
     * stores given value to [x] within chrome.storage.sync
     * @param {string} x: key to store to
     * @param {string} value: value to store with
     */
    storeProperty = (x, value) => {
        chrome.storage.sync.set({ [x]: value });
    }

    /**
     * Retrieves any previously stored variable from chrome.stroage.sync
     * @param {string} x: key to the stored property, "" if not found
     */
    fetchProperty = (x) => {
        return new Promise((resolve) => {
            chrome.storage.sync.get([x], (value) => {
                resolve(value[x]);
            });
        });
    }

}
