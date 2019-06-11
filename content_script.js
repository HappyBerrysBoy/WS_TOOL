(async () => {
  // console.log("팝업 페이지의 DOM 접근 : ", $("header.Header").text());
  const cetegoryDom = $(`
    <div id="extensionApp">
      <div class="vpBox">
        <div class="funcBtn" name="userShortcut">
          <md-button class="md-icon-button" @click="userShortcut">
            <md-icon>account_circle</md-icon>
            <md-tooltip md-direction="right">User Shortcut</md-tooltip>
          </md-button>
        </div>
        <div class="funcBtn" name="tagShortcut">
          <md-button class="md-icon-button" @click="tagShortcut">
            <md-icon>bookmarks</md-icon>
            <md-tooltip md-direction="right">Tag Shortcut</md-tooltip>
          </md-button>
        </div>
        <div class="funcBtn" name="tagFilter">
          <md-button class="md-icon-button" @click="tagFilter">
            <md-icon>visibility_off</md-icon>
            <md-tooltip md-direction="right">Tag Filter</md-tooltip>
          </md-button>
        </div>
        <div class="funcBtn" name="getMarkdown">
          <md-button class="md-icon-button" @click="getMarkdown">
            <md-icon>pageview</md-icon>
            <md-tooltip md-direction="right">Get Markdown</md-tooltip>
          </md-button>
        </div>
        <div class="funcBtn" name="goFamilySite">
          <md-button class="md-icon-button" @click="goFamilySite">
            <md-icon>airport_shuttle</md-icon>
            <md-tooltip md-direction="right">Family Site</md-tooltip>
          </md-button>
        </div>
        
        <disp-func-btn
          v-for="func in funcButtons"
          v-if="func.display"
          :name="func.name"
          :text="func.text"
          :icon="func.icon"
          :func="func.func" />
      </div>

      <div class="vpBox">
        <div style="font-size:0.6rem;word-break:break-word;width:50px;color:yellow;font-weight:bold;">{{account}}</div>
        <disp-voting-power
          v-for="scot in vpList"
          v-if="scot.display"
          :favicon="scot.favicon"
          :url="scot.url"
          :vpstyle="scot.style"
          :unit="scot.unit"
          :percent="scot.vpPercent" />
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
  sites.forEach(site => {
    if (location.href.indexOf(site.site) > -1) {
      $(site.contentArea).after(cetegoryDom);
      return;
    }
  });
})();
