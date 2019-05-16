const FONTS_DATA = {
  "Noto Sans KR": {
    fontUrl: '//fonts.googleapis.com/css?family=Noto+Sans+KR:400,700',
    fontFamily: `'Noto Sans KR', sans-serif`
  },
  "Noto Serif KR": {
    fontUrl: '//fonts.googleapis.com/css?family=Noto+Serif+KR:400,700',
    fontFamily: `'Noto Serif KR', serif`
  },
  "": {}
}

const fontFamilySelector = $("#fontFamilySelector");
const fontSizeSelector = $("#fontSizeSelector");
const fontLineHeightSelector = $("#fontLineHeightSelector");

Object.keys(FONTS_DATA).forEach(function (font) {
  fontFamilySelector.append(`<option value="${font}">${font}</option>`)
});
for (let fontSize = 18; fontSize <= 30; fontSize++) {
  fontSizeSelector.append(`<option value="${fontSize}">${fontSize}px</option>`)
}
for (let fontLineHeight = 150; fontLineHeight <= 200; fontLineHeight = fontLineHeight + 10) {
  fontLineHeightSelector.append(`<option value="${fontLineHeight}">${fontLineHeight}%</option>`)
}

const fontUpdate = () => {
  let value = fontFamilySelector.val();
  let {
    fontUrl,
    fontFamily
  } = FONTS_DATA[value];
  let fontSize = fontSizeSelector.val();
  let lineHeight = fontLineHeightSelector.val();
  let data = {
    fontUrl,
    fontFamily,
    fontSize,
    lineHeight,
  };
  console.log('fontUpdate', data);

  // font 저장
  chrome.storage.sync.set({
    'FONT_STYLE': data
  }, function () {
    console.log('Value is set to ' + data);
  });

  // 참고: https://developer.chrome.com/apps/messaging
  chrome.tabs.getSelected(null, function (tab) {
    console.log('getSelected', tab);
    if (tab && tab.url.startsWith('https://steemit.com')) {
      chrome.tabs.sendMessage(tab.id, {
        action: 'font',
        data,
      });
    }
  });
}

fontFamilySelector.change(fontUpdate);
fontSizeSelector.change(fontUpdate);
fontLineHeightSelector.change(fontUpdate);