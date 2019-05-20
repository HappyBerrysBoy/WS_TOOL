const fontFamilySelector = $("#fontFamilySelector");
const fontSizeSelector = $("#fontSizeSelector");
const fontLineHeightSelector = $("#fontLineHeightSelector");

const appendFontSelectOption = (groupName, datas) => {
  const fontSelectGroupOption = $(`<optgroup label="${groupName}" />`);
  datas.forEach(value => {
    fontSelectGroupOption.append(`<option value="${value}">${value}</option>`);
  });
  fontFamilySelector.append(fontSelectGroupOption);
};

// 폰트 글꼴
appendFontSelectOption("고딕체", GOTHIC_FONTS);
appendFontSelectOption("명조체", MYEONGJO_FONTS);
appendFontSelectOption("스타일체", STYLISH_FONTS);
appendFontSelectOption("펜글씨체", PEN_FONTS);

// 폰트 크기
for (let fontSize = 12; fontSize <= 30; fontSize++) {
  fontSizeSelector.append(`<option value="${fontSize}">${fontSize}px</option>`);
}

// 줄간격
for (
  let fontLineHeight = 100;
  fontLineHeight <= 200;
  fontLineHeight = fontLineHeight + 10
) {
  fontLineHeightSelector.append(
    `<option value="${fontLineHeight}">${fontLineHeight}%</option>`
  );
}

// 저장되어 있는 폰트 설정
chrome.storage.sync.get("FONT_STYLE", ({ FONT_STYLE: data }) => {
  console.log("FONT_STYLE", data);
  if (data) {
    const { fontName, fontSize, lineHeight } = data;
    if (fontName) fontFamilySelector.val(fontName);
    if (fontSize) fontSizeSelector.val(fontSize);
    if (lineHeight) fontLineHeightSelector.val(lineHeight);
  }
});

// 값 변경시 폰트 업데이트 수행
const fontUpdate = () => {
  let fontName = fontFamilySelector.val();
  let fontSize = fontSizeSelector.val();
  let lineHeight = fontLineHeightSelector.val();
  let data = {
    fontName,
    fontSize,
    lineHeight
  };
  console.log("fontUpdate", data);

  // font 저장
  chrome.storage.sync.set(
    {
      FONT_STYLE: data
    },
    function() {
      console.log("Value is set to ", data);
    }
  );

  // 참고: https://developer.chrome.com/apps/messaging
  chrome.tabs.getSelected(null, function(tab) {
    console.log("getSelected", tab);

    // 현재 페이지가 스팀잇 페이지면 메세지 전송
    if (tab && checkMatcheUrl(tab.url)) {
      console.log("checkMatcheUrl", true);
      chrome.tabs.sendMessage(tab.id, {
        action: "font",
        data
      });
    }
  });
};

const MATCHE_URLS = [
  "https://steemit.com/*",
  "https://steemcoinpan.com/*",
  "https://www.steemcoinpan.com/*"
];
function checkMatcheUrl(tabUrl) {
  for (url of MATCHE_URLS) {
    if (new RegExp(url).test(tabUrl)) return true;
  }
  return false;
}

fontFamilySelector.change(fontUpdate);
fontSizeSelector.change(fontUpdate);
fontLineHeightSelector.change(fontUpdate);
