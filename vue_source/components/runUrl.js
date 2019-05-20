Vue.component('runUrl', {
    data() {
        return {
            inputName: '',
            inputUrl: '',
            clickDel:false,
            urls: [
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
                <md-field style="width:150px;margin-right:10px;">
                    <label>Name</label>
                    <md-input v-model="inputName"></md-input>
                </md-field>
                <md-field style="width:600px;">
                    <label>URL(ex:https://www.google.com/)</label>
                    <md-input v-model="inputUrl" @keyup.enter="insertUrl"></md-input>
                </md-field>
                <md-button style="margin-top:16px;" class="md-accent md-mini md-raised" @click="insertUrl">Add Url</md-button>
            </div>
            <div style="display:flex;">
                <md-chip 
                    v-for="url in urls" 
                    class="md-primary" 
                    md-deletable
                    @click="runUrl(url.url)"
                    @md-delete="delCustomUrl">
                    {{url.name}}
                </md-chip>
            </div>
        </div>
    `,
    methods: {
        insertUrl() {
            this.urls.push({ name: this.inputName, url: this.inputUrl });
            localStorage.setItem(WSTOOLS_URL_STORAGE, JSON.stringify(this.urls));
            this.inputName = '';
            this.inputUrl = '';
        },
        delCustomUrl(e) {
            this.clickDel = true;
            let selIdx = -1;
            let selName = $(e.target).closest('.md-chip').text().trim();
            this.urls.filter((url, idx) => {if(url.name == selName) selIdx = idx;});
            this.urls.splice(selIdx, 1);
            localStorage.setItem(WSTOOLS_URL_STORAGE, JSON.stringify(this.urls));
        },
        runUrl(url) {
            if(this.clickDel) {
                this.clickDel = false;
                return;
            }
            window.open(url);
        }
    }
})