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
      window.addEventListener(
        'hashchange',
        () => {
          console.log(location.hash);
          this.showCategory = location.hash === '#category';
        },
        false,
      );

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

      // debugger;
      // // Firebase Firestore
      // // Your web app's Firebase configuration
      // var firebaseConfig = {
      //   apiKey: 'AIzaSyCGXZOUeU83Qp0EiOcTqFqOkWRgmPBsJbg',
      //   authDomain: 'steem-extension.firebaseapp.com',
      //   databaseURL: 'https://steem-extension.firebaseio.com',
      //   projectId: 'steem-extension',
      //   storageBucket: 'steem-extension.appspot.com',
      //   messagingSenderId: '359390784785',
      //   appId: '1:359390784785:web:d74212183bdcb983',
      // };
      // // Initialize Firebase
      // firebase.initializeApp(firebaseConfig);

      // //  Cloud Firestore 인스턴스를 초기화합니다.
      // // firebase.initializeApp({
      // //   apiKey: '### FIREBASE API KEY ###',
      // //   authDomain: '### FIREBASE AUTH DOMAIN ###',
      // //   projectId: '### CLOUD FIRESTORE PROJECT ID ###',
      // // });

      // // Initialize Cloud Firestore through Firebase
      // var db = firebase.firestore();

      // db.collection('users')
      //   .add({
      //     first: 'Ada',
      //     last: 'Lovelace',
      //     born: 1815,
      //   })
      //   .then(function(docRef) {
      //     console.log('Document written with ID: ', docRef.id);
      //   })
      //   .catch(function(error) {
      //     console.error('Error adding document: ', error);
      //   });
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
