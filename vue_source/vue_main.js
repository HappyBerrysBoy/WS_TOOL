Vue.use(VueMaterial.default)(
  new Vue({
    el: '#extensionApp',
    data: {
      show: false,
      menuIcon: 'menu',
      showUserShortcut: false,
      showTagShortcut: false,
      showTagFilter: false,
      showCategory: false,
      showGetMarkdown: false,
      showFamilySite: false,
      showRunUrl: false,
      showGameland: false,
      // showSourceStorage: false,
      scotVoting: [],
      tagFilterList: [],
      showBtnsBoxTag: true,
      account: '',
      funcButtons: [
        {
          name: 'userShortcut',
          text: 'User Shortcut',
          icon: 'account_circle',
          display: true,
        },
        {
          name: 'tagShortcut',
          text: 'Tag Shortcut',
          icon: 'bookmarks',
          display: true,
        },
        {
          name: 'tagFilter',
          text: 'Tag Filter',
          icon: 'visibility_off',
          display: true,
        },
        {
          name: 'getMarkdown',
          text: 'Get Markdown',
          icon: 'pageview',
          display: true,
        },
        {
          name: 'goFamilySite',
          text: 'Family Site',
          icon: 'airport_shuttle',
          display: true,
        },
        {
          name: 'gameLand',
          text: 'Game Land',
          icon: 'videogame_asset',
          display: true,
        },
      ],
      vpList: [
        {
          unit: 'STEEM',
          style: '',
          display: true,
          vpPercent: 0,
          url: 'https://www.steemit.com/',
          favicon: 'https://steemit.com/images/favicons/favicon-16x16.png',
        },
      ],
    },
    computed: {
      steemVPtoFix() {
        return this.steemVP.toFixed(0);
      },
      sctVPtoFix() {
        return this.sctVP.toFixed(0);
      },
      aaaVPtoFix() {
        return this.aaaVP.toFixed(0);
      },
    },
    created() {
      this.tagFilterList = JSON.parse(
        localStorage.getItem(WSTOOLS_POST_FILTER_KEY),
      );
    },
    mounted() {
      window.document.body.addEventListener('resize', () => {
        alert('test');
      });

      // Save Account 추후에 Chrome.storage.sync 로 이동
      localStorage.setItem(WSTOOLS_ACCOUNT, this.getAccount());

      // Tag Filter Scheduler(3 sec)
      setInterval(() => {
        // console.log('Run tag filter..');

        const tagFilterList = JSON.parse(
          localStorage.getItem(WSTOOLS_POST_FILTER_KEY),
        );

        if (!tagFilterList) return;
        if (
          $('#posts_list ul li:eq(0)')
            .find('.timestamp__link')
            .attr('href') == undefined
        )
          return;

        // 최초 아이템은 따로 삭제 해준다.
        if (
          tagFilterList.indexOf(
            $('#posts_list ul li:eq(0)')
              .find('.timestamp__link')
              .attr('href')
              .split('/')[1],
          ) > -1
        ) {
          $('#posts_list ul li:eq(0)').remove();
        }

        $('#posts_list ul li:eq(0)')
          .siblings()
          .each((idx, item) => {
            if (item.querySelector('.articles__content-block--ad'))
              item.querySelector('.articles__content-block--ad').remove();

            if (
              tagFilterList.indexOf(
                $(item)
                  .find('.timestamp__link')
                  .attr('href')
                  .split('/')[1],
              ) > -1
            ) {
              $(item).remove();
            }
          });
      }, 3000);

      let self = this;

      functionList.forEach(funcBtn => {
        new Promise((resolve, reject) => {
          chrome.storage.sync.get(funcBtn, function(item) {
            resolve(item);
          });
        }).then(item => {
          const btns = self.funcButtons.filter(btn => {
            return btn.name == funcBtn;
          });

          if (!btns.length) return;

          btns[0].display = item[funcBtn];
          self.showBtnsBox();
        });
      });

      chrome.storage.sync.get('scotList', function(items) {
        if (!items['scotList']) return;

        // console.log('Scot List Storage Sync Get', items['scotList']);

        items['scotList'].forEach(scot => {
          new Promise((resolve, reject) => {
            chrome.storage.sync.get(scot, function(item) {
              resolve(item);
            });
          }).then(item => {
            const unitSites = sites.filter(site => {
              return site.unit == scot;
            });

            if (!unitSites.length) return;

            self.vpList.push({
              unit: scot,
              style: 'md-accent',
              display: item[scot],
              vpPercent: 0,
              url: unitSites[0].url,
              favicon: unitSites[0].favicon,
            });
          });
        });
      });

      // 보팅 파워 가져오기 & 자동 Refresh 5sec
      this.refreshVP();
      setInterval(this.refreshVP, 5000);

      chrome.extension.onMessage.addListener(function(request) {
        const { action, data } = request;

        // console.log(
        //   `vue_main chrome.extension.onMessage : ${action}, ${data.name}, ${
        //     data.val
        //   }`,
        // );

        if (action === 'getAccount') {
          if (data['steem']) {
            // 0번이 항상 Steem
            self.vpList[0].vpPercent = parseFloat(
              isNaN(data['steem']) ? 0 : data['steem'],
            );
          }

          // console.log(data.scotArray);

          data.scotArray.forEach(scot => {
            self.vpList.forEach(vp => {
              if (vp.unit == scot.unit) {
                vp.vpPercent = parseFloat(isNaN(scot.vp) ? 0 : scot.vp);
              }
            });
          });
        } else if (action === 'displayControl') {
          var selBtn = self.funcButtons.filter(btn => {
            return btn.name == data.name;
          });

          if (selBtn.length) {
            selBtn[0].display = data.val;
            self.showBtnsBox();
          } else {
            chrome.storage.sync.get([data.name], function(result) {
              self.vpList.forEach(vp => {
                if (vp.unit == data.name) {
                  vp.display = result[data.name];
                }
              });
            });
          }

          // self.showBtnsBox();
        }
      });

      // 단축키 설정
      document.body.onkeydown = function(e) {
        if (e.keyCode == 27) {
          self.allClose();
        } else if (event.altKey && e.keyCode == 49) {
          self.userShortcut();
        } else if (event.altKey && e.keyCode == 50) {
          self.tagShortcut();
        } else if (event.altKey && e.keyCode == 51) {
          self.tagFilter();
        } else if (event.altKey && e.keyCode == 52) {
          self.getMarkdown();
        } else if (event.altKey && e.keyCode == 53) {
          self.goFamilySite();
        }
        // else if (event.altKey && e.keyCode == 54) {
        //   self.sourceStorage();
        // }
      };
    },
    methods: {
      allClose() {
        this.showUserShortcut = false;
        this.showTagShortcut = false;
        this.showTagFilter = false;
        this.showGetMarkdown = false;
        this.showFamilySite = false;
        this.showRunUrl = false;
        this.gameland = false;
        // this.showSourceStorage = false;
      },
      showMenu() {
        this.show = !this.show;
        if (this.show) {
          this.menuIcon = 'cancel';
        } else {
          this.menuIcon = 'menu';
        }
      },
      goCategory() {
        alert('멋진 모습으로 개발중..!!');
        // window.open(`https://anpigon.github.io/steemit-community/#/`);
      },
      userShortcut() {
        this.allClose();
        this.showUserShortcut = true;
      },
      tagFilter() {
        this.allClose();
        this.showTagFilter = true;
      },
      tagShortcut() {
        this.allClose();
        this.showTagShortcut = true;
      },
      getMarkdown() {
        this.allClose();
        this.showGetMarkdown = true;
      },
      goFamilySite() {
        this.allClose();
        this.showFamilySite = true;
      },
      gameLand() {
        this.allClose();
        this.showGameland = true;
      },
      // sourceStorage() {
      //   this.allClose();
      //   this.showSourceStorage = true;
      // },
      runUrl() {
        this.allClose();
        this.showRunUrl = true;
      },
      getAccount() {
        let account = null;

        if (location.href.indexOf('busy.org') > -1) {
          if ($('.Topnav__user')) {
            // Logged In
            account = $('.Topnav__user')[0].href.split('@')[1];
          }
        } else if (location.href.indexOf('steempeak.com') > -1) {
          const peakAccount = $('.dropdown.dropdown-user')
            .find('.router-link-active')
            .attr('href');
          if (peakAccount) {
            account = peakAccount.split('@')[1];
          }
        } else if (location.href.indexOf('steem-engine.com') > -1) {
          $('#lnkUsername')
            .find('span')
            .remove();
          account = $('#lnkUsername')
            .text()
            .trim()
            .replace(/@/g, '');
        } else {
          // Steemit/SteemCoinpan/TripleA 인 경우 가져오는 방법임..
          account = $('.Header .Userpic').attr('style');
          account = account ? account.split('/')[4] : null;
        }

        if (account) {
          this.account = account;
        }

        return account;
      },
      refreshVP() {
        // 보팅 파워 가져오기
        const account = this.getAccount();
        if (account) {
          chrome.runtime.sendMessage({
            action: 'getAccount',
            data: { username: account },
          });
        }
      },
      funcdo(name) {
        if (name === 'userShortcut') {
          this.userShortcut();
        } else if (name === 'tagShortcut') {
          this.tagShortcut();
        } else if (name === 'tagFilter') {
          this.tagFilter();
        } else if (name === 'getMarkdown') {
          this.getMarkdown();
        } else if (name === 'goFamilySite') {
          this.goFamilySite();
        } else if (name === 'gameLand') {
          this.gameLand();
        }
        // else if (name === 'sourceStorage') {
        //   this.sourceStorage();
        // }
      },
      showBtnsBox() {
        const showBtns = this.funcButtons.filter(btn => {
          return btn.display == true;
        });
        this.showBtnsBoxTag = showBtns.length ? true : false;
      },
    },
  }),
)();
