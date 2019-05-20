Vue.component('runUrl', {
    data() {
        return {
            inputName: '',
            inputUrl: '',
            urls: [{
                    name: 'Claim SCT',
                    url: `https://app.steemconnect.com/sign/custom-json?id=scot_claim_token&json=%7B%22symbol%22%3A%22SCT%22%7D`
                },
                {
                    name: 'Claim Weed',
                    url: `https://app.steemconnect.com/sign/custom-json?id=scot_claim_token&json=%7B%22symbol%22%3A%22WEED%22%7D`
                },
                {
                    name: 'Go Steemit!!',
                    url: `https://www.steemit.com/`
                }
            ]
        }
    },
    created() {
        const items = localStorage.getItem(WSTOOLS_URL_STORAGE);

        if (items) {
            this.urls = JSON.parse(items);
        }
    },
    template: `
        <div>
            <h5>Cutom Url</h5>
            <div style="display:flex;">
                <md-field style="width:100px;margin-right:10px;">
                    <label>Name</label>
                    <md-input v-model="inputName"></md-input>
                </md-field>
                <md-field style="width:600px;" @keyup.enter="insertUrl">
                    <label>URL</label>
                    <md-input v-model="inputUrl"></md-input>
                </md-field>
                <md-button class="md-accent md-mini md-raised" @click="insertUrl">Add Url</md-button>
            </div>
            <div style="display:flex;">
                <div v-for="url in urls">
                    <md-button 
                        class="md-raised md-primary" 
                        @click="runUrl(url.url)">
                        {{url.name}}
                    </md-button>
                </div>
            </div>
        </div>
    `,
    computed: {
        customUrlStyle: function() {
            return {
                width: '50px;'
            }
        },
        customUrlStyle: function() {
            return {
                width: '50px;'
            }
        }
    },
    methods: {
        insertUrl() {

            this.urls.push({ name: this.inputName, url: this.inputUrl });
            localStorage.setItem(WSTOOLS_URL_STORAGE, JSON.stringify(this.urls));
        },
        deleteTag() {
            localStorage.setItem(WSTOOLS_URL_STORAGE, JSON.stringify(this.urls));
        },
        runUrl(url) {
            window.open(url);
        }
    }
})