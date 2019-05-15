Vue.component('getMarkdown', {
    data() {
        return {
            url: '',
            markdown:'',
            msg:''
        }
    },
    template: `
        <div style="width:600px;height:500px;padding:10px;">
        <h5>Get Markdown Text</h5>
        <md-field>
            <md-icon>info</md-icon>
            <label>Type url</label>
            <md-input v-model="url" @keyup.enter="searchMarkdown"></md-input>
            <span class="md-helper-text">{{msg}}</span>
        </md-field>
        
        <md-field>
            <label>Markdown</label>
            <md-textarea v-model="markdown" style="max-height:100%;height:345px;"></md-textarea>
        </md-field>
        </div>
    `,
    methods: {
        searchMarkdown() {
            const substr = this.url.split('@')[1];
            const account = substr.split('/')[0];
            const permlink = substr.split('/')[1];

            if(!account || !permlink){
                this.msg = 'URL parsing error';
            }

            steem.api.getContentAsync(account, permlink)
            .then(postObject => this.markdown = postObject.body)
            .catch(error => console.log(error));
        }
    }
})