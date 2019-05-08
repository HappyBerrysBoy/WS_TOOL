(async() => {
    // console.log("팝업 페이지의 DOM 접근 : ", $("header.Header").text());
    const cetegoryDom = $(`
    <div id="app">
      <div class="example" style="position:fixed;left:0px;top:60px;z-index:100;">
        <md-speed-dial class="md-top-left" md-direction="bottom">
          <md-speed-dial-target>
            <md-icon class="md-morph-initial">add</md-icon>
            <md-icon class="md-morph-final">edit</md-icon>
          </md-speed-dial-target>

          <md-speed-dial-content>
            <md-button class="md-icon-button" @click="test">
              <md-icon>account_circle</md-icon>
              <md-tooltip md-direction="right">User Shortcut</md-tooltip>
            </md-button>

            <md-button class="md-icon-button">
              <md-icon>dashboard</md-icon>
              <md-tooltip md-direction="right">Tag Shortcut</md-tooltip>
            </md-button>

            <md-button class="md-icon-button">
              <md-icon>bookmarks</md-icon>
              <md-tooltip md-direction="right">Bookmark</md-tooltip>
            </md-button>
          </md-speed-dial-content>
        </md-speed-dial>
      </div>
    </div>

    <style>
      .md-chip{margin-right:0px !important;}
    </style>
  `);

    $(".App__content").before(cetegoryDom);
})();