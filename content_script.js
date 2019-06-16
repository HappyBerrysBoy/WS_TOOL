(async () => {
  // console.log("팝업 페이지의 DOM 접근 : ", $("header.Header").text());
  const cetegoryDom = $(`
    <div id="extensionApp">
      <div class="vpBox" v-show="showBtnsBoxTag">
        <disp-func-btn
          v-for="func in funcButtons"
          v-if="func.display"
          :name="func.name"
          :text="func.text"
          :icon="func.icon"
          @funcinfo="funcdo" />
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
          <user-shortcut v-show="showUserShortcut" @closefunc="allClose" />
        </md-content>
      </transition>

      <transition name="slide-fade">
        <md-content class="md-elevation-7 popupPanel tagFilter">
          <tag-shortcut v-show="showTagShortcut" @closefunc="allClose" />
        </md-content>
      </transition>

      <transition name="slide-fade">
        <md-content class="md-elevation-7 popupPanel tagFilter">
          <tag-filter v-show="showTagFilter" @closefunc="allClose" />
        </md-content>
      </transition>

      <transition name="slide-fade">
        <md-content class="md-elevation-7 popupPanel">
          <get-markdown v-show="showGetMarkdown" @closefunc="allClose" />
        </md-content>
      </transition>

      <transition name="slide-fade">
        <md-content class="md-elevation-7 popupPanel">
          <go-family-site v-show="showFamilySite" @closefunc="allClose" />
        </md-content>
      </transition>
    </div>
    
  `);
  sites.forEach(site => {
    if (location.href.indexOf(site.site) > -1) {
      $(site.contentArea).before(cetegoryDom);
      return;
    }
  });
})();
