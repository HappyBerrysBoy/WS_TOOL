// 스팀 포스팅 URL 여부 검사
function isSteemitPostUrl(url) {
  // return /^https?:\/\/(www\.)?steem(it)|(coinpan)\.com\/[^\/]+\/@[^\/]+\/.+/.test(
  //   url,
  // );
  const result = /^https?:\/\/(www\.)?(steemit\.com|steemcoinpan\.com|triplea\.reviews)\/[^\/]+\/@[^\/]+\/.+/.test(
    url,
  );
  console.log('isSteemitPostUrl:', result);
  return result;
}

// 페이지 업데이트 되었을 때
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('onUpdated', {
    tabId,
    changeInfo,
    tab,
  });
  // console.log(changeInfo.status === 'complete', isSteemitPostUrl(tab.url))
  if (changeInfo.status === 'complete' && isSteemitPostUrl(tab.url)) {
    console.log('isSteemitPostUrl:', true);
    // 폰트 체인저 호출
    loadFontChanger(tabId);
  }
});

chrome.runtime.onInstalled.addListener(details => {
  console.log('onInstalled', details);

  chrome.storage.sync.get('scotList', function(items) {
    if (items['scotList']) return;

    console.log('onInstalled(Set default data)');
    chrome.storage.sync.set({ scotList: scotList }, () =>
      console.log('SCOT token list saved.'),
    );

    let steemObj = new Object();
    steemObj[scot] = true;
    chrome.storage.sync.set(steemObj, () => console.log('VP value saved.'));

    // 초기 설치시에 저장된 값이 없으면 무조건 저장
    scotList.forEach(scot => {
      let obj = new Object();
      obj[scot] = true;
      chrome.storage.sync.set(obj, () => console.log('VP value saved.'));
    });

    functionList.forEach(btn => {
      let obj = new Object();
      obj[btn] = true;
      chrome.storage.sync.set(obj, () => console.log('Function button saved.'));
    });
  });
});

chrome.tabs.onActivated.addListener(activeInfo => {
  console.log('onActivated1', activeInfo);
  chrome.tabs.get(activeInfo.tabId, tab => {
    console.log('onActivated2', tab);
    if (isSteemitPostUrl(tab.url)) {
      // loadFontChanger(tab.id);
      chrome.tabs.executeScript(
        tab.id,
        {
          code: `updateFontStyle()`,
          runAt: 'document_end',
        },
        () => {},
      );
    }
  });
});

const loadFontChanger = tabId =>
  loadContentScript({
    tabId,
    file: '/content/fontChanger.js',
  });

// 컨텐츠 스크립트 실행
const loadContentScript = ({ tabId, file }) => {
  console.log('[WS] loadContentScript', {
    tabId,
    file,
  });
  return new Promise((resolve, reject) => {
    chrome.tabs.executeScript(
      tabId,
      {
        file,
        runAt: 'document_end',
      },
      ret => resolve(ret),
    );
  });
};

// 컨텐츠 스크립트에 메세지 전달
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('chrome.extension.onMessage', request, sender);
  const { action, data } = request;

  // SCOT 계정 정보 가져오기
  if (action === 'getAccount') {
    console.log('getAccount', data.username);
    Promise.all([
      getAccount(data.username),
      getSCOTAccount(data.username),
    ]).then(data => {
      console.log('getAllAccount', data);

      const steem = currentVotinPower(data[0]);
      let scotArray = [];

      scotList.forEach(scot => {
        scotArray.push({ unit: scot, vp: getScotData(data[1], scot) });
      });

      const result = {
        username: data.username,
        scotArray,
        steem,
      };

      if (sender.tab) {
        // 컨텐츠로 응답
        chrome.tabs.sendMessage(sender.tab.id, { action, data: result });
      } else {
        // 팝업으로 응답
        chrome.extension.sendMessage({ action, data: result });
      }
    });
  }
});

function getScotData(data, unit) {
  if (!unit) return;
  return currentVotinPower(data[unit] ? data[unit] : 0);
}
