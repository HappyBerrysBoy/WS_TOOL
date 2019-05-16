// Respond to the click on extension Icon
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript({
        code: ''
    });
    // chrome.tabs.executeScript(tab.id, {
    //     file: 'inject.js'
    // });
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
 
	chrome.pageAction.onClicked.addListener(function(tab) {
	    chrome.tabs.getSelected(null, function(tab) {
	    	// 컨텐트 스크립트에 배경 처리를 요청합니다.
	    	chrome.tabs.sendMessage(tab.id, {});
	    });
	});
 
	// 페이지 액션 아이콘을 보여준다.
	chrome.pageAction.show(sender.tab.id);
});
