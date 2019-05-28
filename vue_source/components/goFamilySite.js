Vue.component('goFamilySite', {
    data() {
        return {
            sites: [{
                    groupName: 'Condensers',
                    siteList: [{
                        name: 'Steemit',
                        description: '',
                        url: 'https://steemit.com/'
                    }, {
                        name: 'Busy',
                        description: '',
                        url: 'https://busy.org/'
                    }, {
                        name: 'Steempeak',
                        description: '',
                        url: 'https://steempeak.com/'
                    }, {
                        name: 'Steemkr',
                        description: '',
                        url: 'https://steemkr.com/'
                    }, {
                        name: 'Steemit Wallet',
                        description: '',
                        url: 'https://steemitwallet.com'
                    }]
                },
                {
                    groupName: 'Util Sites',
                    siteList: [{
                        name: 'My Feed',
                        description: '@wonsama',
                        url: 'https://wonsama.github.io/myfeed/#'
                    }, {
                        name: 'Engine Coin Holder',
                        description: '@wonsama',
                        url: 'https://wonsama.github.io/steemengine/index.html?symbol=JJM'
                    }, {
                        name: 'Steemit Calculator',
                        description: '@anpigon',
                        url: 'https://anpigon.github.io/steemit-calculator/',
                    }, {
                        name: 'Steemd',
                        description: '',
                        url: 'https://steemd.com/'
                    }, {
                        name: 'Steem world',
                        description: '',
                        url: 'https://steemworld.org/'
                    }, {
                        name: 'Steem Tool',
                        description: '@segyepark',
                        url: 'https://tool.steem.world/'
                    }, {
                        name: 'JabSteem',
                        description: '@asinayo',
                        url: 'https://asinayo.github.io/jabsteem/#/intro'
                    }, {
                        name: 'Steeme',
                        description: '@asbear',
                        url: 'https://ianpark.github.io/steeme/'
                    }, {
                        name: 'JJM HOLDERS',
                        description: '@jacobyu',
                        url: 'https://passionbull.github.io/jjm/'
                    }]
                },
                {
                    groupName: 'Steemengine Sites',
                    siteList: [{
                        name:'Claim SCT',
                        url:'https://app.steemconnect.com/sign/custom-json?id=scot_claim_token&json=%7B%22symbol%22%3A%22SCT%22%7D'
                    },{
                        name: 'Steem Engine',
                        description: '',
                        url: 'https://steem-engine.com/'
                    }, {
                        name: 'Steem Coinpan',
                        description: '',
                        url: 'http://www.steemcoinpan.com/'
                    }, {
                        name: 'Scot Voting Power',
                        description:'@blockchainstudio',
                        url: 'https://economicstudio.github.io/vp/?t=SCT&a='
                    }]
                }
            ]
        }
    },
    template: `
        <div style="margin:5px 10px;">
            <h5>Link Family Sites</h5>
            <div v-for="group in sites">
                <div>{{group.groupName}}</div>
                    <md-button 
                        v-for="site in group.siteList"
                        class="md-raised md-primary" 
                        @click="goSite(site.url)">
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
        goSite(url) {
            let account = localStorage.getItem(WSTOOLS_ACCOUNT);
            if(account == null){
                window.open(url);
            }else{
                window.open(url + account);
            }
        }
    }
})