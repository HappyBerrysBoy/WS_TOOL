var FONTS_DATA = {
  "Noto Sans KR": {
    fontUrl: '//fonts.googleapis.com/css?family=Noto+Sans+KR:400,700',
    fontFamily: `'Noto Sans KR', sans-serif`
  },
  "Noto Serif KR": {
    fontUrl: '//fonts.googleapis.com/css?family=Noto+Serif+KR:400,700',
    fontFamily: `'Noto Serif KR', serif`
  }
} 

var fontSelector = $("#fontSelector");
Object.keys(FONTS_DATA).forEach(function(font) {
  fontSelector.append(`<option value="${font}">${font}</option>`)
});

fontSelector.change(function() {
  var data = FONTS_DATA[fontSelector.val()]
  // font 저장

  // 참고: https://developer.chrome.com/apps/messaging
  chrome.tabs.getSelected(null, function(tab) {
    console.log(tab);
    if( tab.url.startsWith('https://steemit.com') ) {
      chrome.tabs.sendMessage(tab.id, {
        action: 'font',
        data,
      });
    }
  });
})