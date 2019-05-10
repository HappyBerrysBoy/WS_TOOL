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
      <transition name="slide-fade">
        <md-content id="shortcutUser" class="md-elevation-7">
          <shortcutuser v-show="showUserShortcut" />
        </md-content>
      </transition>
    </div>
  `);

    $(".App__content").before(cetegoryDom);
    // $(".App__content").before($(`<iframe src="https://busy.org/" style="width:100%;height:300px;"></iframe>`));

})();