Vue.component('getMarkdown', {
    data() {
        return {
            url: '',
            markdown: '',
            msg: '',
            showDialog: false,
            convertedHtml: ''
        }
    },
    template: `
        <div style="width:600px;height:500px;padding:10px;">
        <h5>Get Markdown Text</h5>
        <md-dialog :md-active.sync="showDialog">
            <center>
                <md-dialog-title>Converted to HTML</md-dialog-title>
            </center>

            <md-field>
                <md-textarea v-model="convertedHtml"></md-textarea>
            </md-field>

            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Close</md-button>
            </md-dialog-actions>
        </md-dialog>
        
        <md-field>
            <md-icon>info</md-icon>
            <label>Type url</label>
            <md-input v-model="url" @keyup.enter="searchMarkdown"></md-input>
            <span class="md-helper-text">{{msg}}</span>
        </md-field>
        
        <md-field>
            <md-textarea v-model="markdown" style="max-height:100%;height:345px;"></md-textarea>
        </md-field>
        </div>
    `,
    methods: {
        searchMarkdown() {
            const substr = this.url.split('@')[1];
            const account = substr.split('/')[0];
            const permlink = substr.split('/')[1];

            if (!account || !permlink) {
                this.msg = 'URL parsing error';
            }

            steem.api.getContentAsync(account, permlink)
                .then(postObject => this.markdown = postObject.body)
                .catch(error => console.log(error));
        }
    }
})