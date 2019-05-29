(async () => {
  // console.log("팝업 페이지의 DOM 접근 : ", $("header.Header").text());
  const cetegoryDom = $(`
    <div id="app">
      <div style="position:fixed;left:0px;top:70px;z-index:100;">
        <md-speed-dial class="md-top-left" md-direction="bottom" md-diameter="30">
          <md-speed-dial-target @click="allClose">
            <md-icon class="md-morph-initial">add</md-icon>
            <md-icon class="md-morph-final">settings</md-icon>
          </md-speed-dial-target>

          <md-speed-dial-content>
            <md-button class="md-icon-button" @click="goCategory">
              <md-icon>chrome_reader_mode</md-icon>
              <md-tooltip md-direction="right">Tag Group View(Under development by @anpigon)</md-tooltip>
            </md-button>
          
            <md-button class="md-icon-button" @click="userShortcut">
              <md-icon>account_circle</md-icon>
              <md-tooltip md-direction="right">User Shortcut</md-tooltip>
            </md-button>

            <md-button class="md-icon-button" @click="tagShortcut">
              <md-icon>bookmarks</md-icon>
              <md-tooltip md-direction="right">Tag Shortcut</md-tooltip>
            </md-button>

            <md-button class="md-icon-button" @click="tagFilter">
              <md-icon>visibility_off</md-icon>
              <md-tooltip md-direction="right">Tag Filter</md-tooltip>
            </md-button>

            <md-button class="md-icon-button" @click="getMarkdown">
              <md-icon>pageview</md-icon>
              <md-tooltip md-direction="right">Get Markdown</md-tooltip>
            </md-button>
            
            <md-button class="md-icon-button" @click="goFamilySite">
              <md-icon>airport_shuttle</md-icon>
              <md-tooltip md-direction="right">Family Site</md-tooltip>
            </md-button>

            </md-speed-dial-content>
        </md-speed-dial>
      </div>

      <div style="position:fixed;left:15px;top:93%;z-index:100;">
        <div style="float:left;">
          <md-progress-spinner md-mode="determinate" md-diameter="25" :md-value="steemVP"></md-progress-spinner>
          <md-tooltip md-direction="top">Steem {{steemVP}}%</md-tooltip>
        </div>
        <div style="float:left;margin-left:5px;">
          <md-progress-spinner class="md-accent" md-diameter="25" md-mode="determinate" :md-value="sctVP"></md-progress-spinner>
          <md-tooltip md-direction="top">SCT {{sctVP}}%</md-tooltip>
        </div>
        <div id="scotInfo">

        </div>
      </div>

      <transition name="slide-fade">
        <md-content class="md-elevation-7 popupPanel">
          <user-shortcut v-show="showUserShortcut" @closeShortcutUserEvent="userShortcut" />
        </md-content>
      </transition>

      <transition name="slide-fade">
        <md-content class="md-elevation-7 popupPanel tagFilter">
          <tag-shortcut v-show="showTagShortcut" />
        </md-content>
      </transition>

      <transition name="slide-fade">
        <md-content class="md-elevation-7 popupPanel tagFilter">
          <tag-filter v-show="showTagFilter" />
        </md-content>
      </transition>

      <transition name="slide-fade">
        <md-content class="md-elevation-7 popupPanel">
          <get-markdown v-show="showGetMarkdown" />
        </md-content>
      </transition>

      <transition name="slide-fade">
        <md-content class="md-elevation-7 popupPanel">
          <go-family-site v-show="showFamilySite" />
        </md-content>
      </transition>
    </div>
    
  `);

  $('.App__content').before(cetegoryDom);
  // $(".App__content").before($(`<iframe src="https://busy.org/" style="width:100%;height:300px;"></iframe>`));
})();
