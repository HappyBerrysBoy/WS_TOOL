Vue.component('goFamilySite', {
  data() {
    return {
      sites: [
        {
          groupName: 'Condensers',
          siteList: [
            {
              name: 'Steemit',
              needAccount: false,
              description: '',
              url: 'https://steemit.com/',
            },
            {
              name: 'Busy',
              needAccount: false,
              description: '',
              url: 'https://busy.org/',
            },
            {
              name: 'Steempeak',
              needAccount: false,
              description: '',
              url: 'https://steempeak.com/',
            },
            {
              name: 'Steemkr',
              needAccount: false,
              description: '',
              url: 'https://steemkr.com/',
            },
            {
              name: 'Steemit Wallet',
              needAccount: false,
              description: '',
              url: 'https://steemitwallet.com',
            },
          ],
        },
        {
          groupName: 'Util Sites',
          siteList: [
            {
              name: 'My Feed',
              needAccount: false,
              description: '@wonsama',
              url: 'https://wonsama.github.io/myfeed/#',
            },
            {
              name: 'Engine Coin Holder',
              needAccount: false,
              description: '@wonsama',
              url:
                'https://wonsama.github.io/steemengine/index.html?symbol=JJM',
            },
            {
              name: 'Steemit Calculator',
              needAccount: false,
              description: '@anpigon',
              url: 'https://anpigon.github.io/steemit-calculator/',
            },
            {
              name: 'Steemd',
              needAccount: true,
              description: '',
              url: 'https://steemd.com/@',
            },
            {
              name: 'Steem world',
              needAccount: true,
              description: '',
              url: 'https://steemworld.org/@',
            },
            {
              name: 'Steem Tool',
              needAccount: false,
              description: '@segyepark',
              url: 'https://tool.steem.world/',
            },
            {
              name: 'JabSteem',
              needAccount: false,
              description: '@asinayo',
              url: 'https://asinayo.github.io/jabsteem/#/intro',
            },
            {
              name: 'Steeme',
              needAccount: false,
              description: '@asbear',
              url: 'https://ianpark.github.io/steeme/',
            },
            {
              name: 'JJM HOLDERS',
              needAccount: false,
              description: '@jacobyu',
              url: 'https://passionbull.github.io/jjm/',
            },
          ],
        },
        {
          groupName: 'Steemengine Sites',
          siteList: [
            {
              name: 'Steem Coinpan',
              needAccount: false,
              description: '',
              url: 'http://www.steemcoinpan.com/',
            },
            {
              name: 'AAA',
              needAccount: false,
              description: '',
              url: 'https://www.triplea.reviews/',
            },
            {
              name: 'Claim SCT',
              needAccount: false,
              url:
                'https://app.steemconnect.com/sign/custom-json?id=scot_claim_token&json=%7B%22symbol%22%3A%22SCT%22%7D',
            },
            {
              name: 'Steem Engine',
              needAccount: false,
              description: '',
              url: 'https://steem-engine.com/',
            },
            {
              name: 'Scot Voting Power',
              needAccount: true,
              description: '@blockchainstudio',
              url: 'https://economicstudio.github.io/vp/?t=SCT&a=',
            },
          ],
        },
      ],
    };
  },
  template: `
        <div style="margin:5px 10px;">
          <div>
            <div style="float:left;"><h5>Link Family Sites</h5></div>
            <md-button class="closeLocation" @click="closeEvent">
              <md-icon>close</md-icon>
            </md-button>
          </div>
          <div v-for="group in sites">
              <div>{{group.groupName}}</div>
                  <md-button 
                      v-for="site in group.siteList"
                      class="md-raised md-primary" 
                      @click="goSite(site.url, site.needAccount)">
                      {{site.name}}
                      <br>
                      {{site.description}}
                  </md-button>
          </div>

          <md-divider></md-divider>

          <run-url />
        </div>
    `,
  methods: {
    goSite(url, needAccount) {
      let account = localStorage.getItem(WSTOOLS_ACCOUNT);
      if (account == null || !needAccount) {
        window.open(url);
      } else {
        window.open(url + account);
      }
    },
    closeEvent() {
      this.$emit('closefunc');
    },
  },
});
