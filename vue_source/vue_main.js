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
      scotVoting: [],
      tagFilterList: [],
      displayFuncIcon: true,
      vpList: [
        {
          unit: 'steem',
          style: '',
          display: true,
          vpPercent: 50,
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

      const self = this;

      chrome.storage.sync.get('scotList', function(items) {
        if (!items['scotList']) return;

        items['scotList'].forEach(scot => {
          new Promise((resolve, reject) => {
            chrome.storage.sync.get(scot, function(item) {
              resolve(item);
            });
          }).then(item => {
            self.vpList.push({
              unit: scot,
              style: 'md-accent',
              display: item[scot],
              vpPercent: 0,
            });
          });
        });
      });
    },
    mounted() {
      window.document.body.addEventListener('resize', () => {
        alert('test');
      });

      $('.App__content').resize(function() {
        alert('zdzxc;lksjdf');
      });

      // Save Account
      if ($('.Header .Userpic').attr('style')) {
        let account = $('.Header .Userpic')
          .attr('style')
          .split('/')[4];
        localStorage.setItem(WSTOOLS_ACCOUNT, account);
      } else {
        localStorage.setItem(WSTOOLS_ACCOUNT, null);
      }

      // Tag Filter Scheduler(3 sec)
      setInterval(() => {
        console.log('Run tag filter..');

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

      // 보팅 파워 가져오기 & 자동 Refresh 5sec
      this.refreshVP();
      setInterval(this.refreshVP, 5000);

      chrome.extension.onMessage.addListener(function(request) {
        const { action, data } = request;

        console.log(
          `vue_main chrome.extension.onMessage : ${action}, ${data.name}, ${
            data.val
          }`,
        );

        if (action === 'getAccount') {
          if (data['steem']) {
            // 0번이 항상 Steem
            self.vpList[0].vpPercent = parseFloat(
              isNaN(data['steem']) ? 0 : data['steem'],
            );
          }

          data.scotArray.forEach(scot => {
            self.vpList.forEach(vp => {
              if (vp.unit == scot.unit) {
                vp.vpPercent = parseFloat(isNaN(scot.vp) ? 0 : scot.vp);
              }
            });
          });
        } else if (action === 'displayControl') {
          debugger;
          if (data.name === 'displayFunction') {
            self.displayFuncIcon = data.val;
          } else {
            chrome.storage.sync.get([data.name], function(result) {
              self.vpList.forEach(vp => {
                if (vp.unit == data.name) {
                  vp.display = result[data.name];
                }
              });
            });
          }
        }
      });
    },
    methods: {
      allClose() {
        this.showUserShortcut = false;
        this.showTagShortcut = false;
        this.showTagFilter = false;
        this.showGetMarkdown = false;
        this.showFamilySite = false;
        this.showRunUrl = false;
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
      closeShortcutUser() {
        this.showUserShortcut = false;
      },
      runUrl() {
        this.allClose();
        this.showRunUrl = true;
      },
      getAccount() {
        // Steemit/SteemCoinpan/TripleA 인 경우 가져오는 방법임..
        const account = $('.Header .Userpic').attr('style');
        return account ? account.split('/')[4] : '';
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
    },
  }),
)();
