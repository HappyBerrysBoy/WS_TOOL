// 스팀 포스팅 URL 여부 검사
function isSteemitPostUrl(url) {
  return /^https?:\/\/(www\.)?steem(it)|(coinpan)\.com\/[^\/]+\/@[^\/]+\/.+/.test(
    url
  );
}

// 페이지 업데이트 되었을 때
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("onUpdated", {
    tabId,
    changeInfo,
    tab
  });
  // console.log(changeInfo.status === 'complete', isSteemitPostUrl(tab.url))
  if (changeInfo.status === "complete" && isSteemitPostUrl(tab.url)) {
    // 폰트 체인저 호출
    loadFontChanger(tabId);
  }
});

chrome.runtime.onInstalled.addListener(details => {
  console.log("onInstalled", details);
});

chrome.tabs.onActivated.addListener(activeInfo => {
  console.log("onActivated1", activeInfo);
  chrome.tabs.get(activeInfo.tabId, tab => {
    console.log("onActivated2", tab);
    if (isSteemitPostUrl(tab.url)) {
      // loadFontChanger(tab.id);
      chrome.tabs.executeScript(
        tab.id,
        {
          code: `updateFontStyle()`,
          runAt: "document_end"
        },
        () => {}
      );
    }
  });
});

const loadFontChanger = tabId =>
  loadContentScript({
    tabId,
    file: "/content/fontChanger.js"
  });

// 컨텐츠 스크립트 실행
const loadContentScript = ({ tabId, file }) => {
  console.log("[WS] loadContentScript", {
    tabId,
    file
  });
  return new Promise((resolve, reject) => {
    chrome.tabs.executeScript(
      tabId,
      {
        file,
        runAt: "document_end"
      },
      ret => resolve(ret)
    );
  });
};

// 컨텐츠 스크립트에 메세지 전달
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("chrome.extension.onMessage", request);
  chrome.tabs.getSelected(null, function(tab) {
    // if (tab && checkMatcheUrl(tab.url)) {
    chrome.tabs.sendMessage(tab.id, {
      action: "getUsername"
    });
    // }
  });
});
