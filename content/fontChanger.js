// 폰트 체인저
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(sender.tab ?
		"from a content script:" + sender.tab.url :
		"from the extension");
	console.log(request);
	const {
		action,
		data
	} = request;
	if (action === 'font') {
		updateFontStyle(data);
	}
});

chrome.storage.sync.get(['FONT_STYLE'], (items) => {
	console.log('[WS] FONT_STYLE', items);
	updateFontStyle(items);
});

// 폰트 적용하기
const updateFontStyle = (data) => {
	console.log('updateFontStyle', data)
	const {
		fontUrl,
		fontFamily,
		fontSize,
		lineHeight,
	} = data;

	document.querySelector("#wstoolfontstyles").remove();
	const styleElement = document.createElement('style');
	styleElement.type = 'text/css';
	styleElement.id = "wstoolfontstyles";
	const customFontStyles = `${fontUrl?`@import url('${fontUrl}');`:''}
		.Markdown, .Comment .Markdown.MarkdownViewer--small { 
			${fontFamily?`font-family: ${fontFamily} !important;`:''}
			${fontSize?`font-size: ${fontSize}px;`:''}
			font-weight: 400;
			color: rgba(0,0,0,.84);
		}
		${lineHeight?`.Markdown p, .ReplyEditor__body.rte p {
			line-height: ${lineHeight}%;
		}`:''}`;
	styleElement.innerText = customFontStyles;
	if (document.head) {
		document.head.appendChild(styleElement);
	} else {
		document.documentElement.appendChild(styleElement);
	}
}