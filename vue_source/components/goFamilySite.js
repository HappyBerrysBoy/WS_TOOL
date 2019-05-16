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
                        name: 'Steem Engine',
                        description: '',
                        url: 'https://steem-engine.com/'
                    }, {
                        name: 'Steem Coinpan',
                        description: '',
                        url: 'http://www.steemcoinpan.com/'
                    }, {
                        name: 'Weedcash',
                        url: 'http://www.weedcash.network/'
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
        </div>
    `,
    methods: {
        goSite(url) {
            window.open(url);
        }
    }
})