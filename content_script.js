(async() => {
    // console.log("팝업 페이지의 DOM 접근 : ", $("header.Header").text());
    const cetegoryDom = $(`
    <div id="app">
      <div style="position:fixed;left:0px;top:60px;z-index:100;">
        <md-speed-dial class="md-top-left" md-direction="bottom">
          <md-speed-dial-target>
            <md-icon class="md-morph-initial">add</md-icon>
            <md-icon class="md-morph-final">settings</md-icon>
          </md-speed-dial-target>

          <md-speed-dial-content>
            <md-button class="md-icon-button" @click="userShortcut">
              <md-icon>account_circle</md-icon>
              <md-tooltip md-direction="right">User Shortcut</md-tooltip>
            </md-button>

            <md-button class="md-icon-button" @click="tagShortcut">
              <md-icon>category</md-icon>
              <md-tooltip md-direction="right">Category</md-tooltip>
            </md-button>

            <md-button class="md-icon-button">
              <md-icon>bookmarks</md-icon>
              <md-tooltip md-direction="right">Bookmark</md-tooltip>
            </md-button>

            <md-button class="md-icon-button" @click="goCategory">
              <md-icon>category</md-icon>
              <md-tooltip md-direction="right">Category</md-tooltip>
            </md-button>
          </md-speed-dial-content>
        </md-speed-dial>
      </div>

      <md-content class="md-elevation-7" style="position:fixed;left:100px;top:85px;z-index:100;">
        <shortcutuser v-show="showUserShortcut" />
      </md-content>

      <transition name="slide-fade">
        <category v-if="showCategory" @close="showCategory = false" />
      </transition>
    </div>
    <div id="routeTest">
      <input type="text" v-model="currentRoute" />
    </div>
  `);

    $(".App__content").before(cetegoryDom);

  })();

// 폰트 체인저
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(sender.tab ?
    "from a content script:" + sender.tab.url :
    "from the extension");
  console.log(request);
  const { action, data } = request;
  if(action === 'font') {
    const {
      fontUrl,
      fontFamily
    } = data;

    $("#wstoolfontstyles").remove();
    const customFontStyles = `<style type='text/css' id="wstoolfontstyles"> 
      @import url('${fontUrl}');
      .Markdown, .Comment .Markdown.MarkdownViewer--small { 
        font-family: ${fontFamily} !important;
        font-size: 20px;
        font-weight: 400;
        color: rgba(0,0,0,.84);
      }
    </style>`
    $(customFontStyles).appendTo("head");
  }
  // sendResponse({ ok: true });
  
});