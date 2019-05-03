// Respond to the click on extension Icon
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript({
        code: ''
    });
    // chrome.tabs.executeScript(tab.id, {
    //     file: 'inject.js'
    // });
});
