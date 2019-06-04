// chrome.storage.sync.get(["FONT_STYLE"], items => {
//   console.log("[WS] FONT_STYLE", items);
//   updateFontStyle(items);
// });

(() => {
  // 폰트 적용하기
  const updateFontStyle = () => {
    console.log('updateFontStyle');
    chrome.storage.sync.get('FONT_STYLE', ({ FONT_STYLE: data }) => {
      console.log('[WS] FONT_STYLE', data);
      const { fontName, fontSize, lineHeight, fontColor, fontColorDark } = data;

      let checked = document.querySelector('#wstoolfontstyles');
      if (!!checked) checked.remove();
      const styleElement = document.createElement('style');
      styleElement.type = 'text/css';
      styleElement.id = 'wstoolfontstyles';
      const customFontStyles = `${
        fontName
          ? `@import url('//fonts.googleapis.com/css?family=${fontName.replace(
              /\s/g,
              '+',
            )}:400,700&display=swap&subset=korean');`
          : ''
      }
.Markdown, .Comment .Markdown.MarkdownViewer--small { 
	${
    fontName
      ? `font-family: "${fontName}", "Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif !important;`
      : ''
  }
	${fontSize ? `font-size: ${fontSize}px;` : ''}
  font-weight: 400;
	color: ${fontColor ? fontColor : '#333333'};
}
.theme-dark .Markdown, 
.theme-dark .Comment .Markdown.MarkdownViewer--small { 
  color: ${fontColorDark ? fontColorDark : '#FCFCFC'};
}
${
  lineHeight
    ? `.Markdown p, .ReplyEditor__body.rte p {
	line-height: ${lineHeight}%;
}`
    : ''
}`.replace(/[\r\n]/g, '');
      console.log('customFontStyles', customFontStyles);
      styleElement.innerText = customFontStyles;
      if (document.head) {
        document.head.appendChild(styleElement);
      } else {
        document.documentElement.appendChild(styleElement);
      }
    });
  };

  updateFontStyle();

  // 폰트 체인저
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(
      sender.tab
        ? 'from a content script:' + sender.tab.url
        : 'from the extension',
    );
    console.log('chrome.runtime.onMessage.addListener', request);
    const { action, data } = request;
    if (action === 'font') {
      updateFontStyle();
    }
  });
})();
