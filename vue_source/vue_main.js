Vue.use(VueMaterial.default)(
  new Vue({
    el: '#app',
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
      steemVP: 0,
      sctVP: 0,
      aaaVP: 0,
      displayFuncIcon: false,
      displaySteemVP: false,
      displaySctVP: false,
      displayAaaVP: false,
      vpBoxTop: 100,
      siteList: [
        {
          site: 'steemit.com/',
          scot: false,
          unit: 'Steem',
          context: 'https://steemit.com/',
          textareaSelector:
            "document.getElementsByClassName('upload-enabled')[0]",
          contentArea: '.App__content',
        },
        {
          site: 'steemcoinpan.com/',
          scot: true,
          unit: 'SCT',
          context: 'https://steemcoinpan.com/',
          textareaSelector:
            "document.getElementsByClassName('upload-enabled')[0]",
          contentArea: '.App__content',
        },
        {
          site: 'triplea.reviews/',
          scot: true,
          unit: 'AAA',
          context: 'https://triplea.reviews/',
          textareaSelector:
            "document.getElementsByClassName('upload-enabled')[0]",
          contentArea: '.App__content',
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
      // window.addEventListener(
      //   'hashchange',
      //   () => {
      //     console.log(location.hash);
      //     this.showCategory = location.hash === '#category';
      //   },
      //   false,
      // );

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

      // Display Control
      chrome.storage.sync.get(
        ['displayFunction', 'steemVP', 'sctVP', 'aaaVP'],
        function(result) {
          this.displayFuncIcon = result.displayFunction;
          this.displaySteemVP = result.steemVP;
          this.displaySctVP = result.sctVP;
          this.displayAaaVP = result.aaaVP;

          let cnt = 0;
          if (this.displaySteemVP) cnt += 1;
          if (this.displaySctVP) cnt += 1;
          if (this.displayAaaVP) cnt += 1;
          this.vpBoxTop -= 100 - cnt * 5 + '%';
        }.bind(this),
      );

      // 보팅 파워 가져오기
      let account = localStorage.getItem(WSTOOLS_ACCOUNT);
      if (account) {
        chrome.runtime.sendMessage({
          action: 'getAccount',
          data: { username: account },
        });
      }

      chrome.extension.onMessage.addListener(function(request) {
        // console.log('getAccount', request);
        const { action, data } = request;

        console.log(
          `vue_main chrome.extension.onMessage : ${action}, ${data.name}, ${
            data.val
          }`,
        );

        if (action === 'getAccount') {
          self.steemVP = parseFloat(isNaN(data.steem) ? 0 : data.steem);
          self.sctVP = parseFloat(isNaN(data.sct) ? 0 : data.sct);
          self.aaaVP = parseFloat(isNaN(data.aaa) ? 0 : data.aaa);
        } else if (action === 'displayControl') {
          if (data.name === 'displayFunction') {
            self.displayFuncIcon = data.val;
          } else if (data.name === 'steemVP') {
            console.log(`Change steemVP Display status:${data.val}`);
            self.displaySteemVP = data.val;
          } else if (data.name === 'sctVP') {
            console.log(`Change SCT_VP Display status:${data.val}`);
            self.displaySctVP = data.val;
          } else if (data.name === 'aaaVP') {
            console.log(`Change AAA_VP Display status:${data.val}`);
            self.displayAaaVP = data.val;
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
    },
  }),
)();
