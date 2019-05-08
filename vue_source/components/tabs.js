Vue.component('tabs', {
    template: `
        <div :style="backgroundStyle">
            <md-tabs md-sync-route :style="titleStyle">
            <md-tab id="tab-category" md-label="Category">
                <category></category>
            </md-tab>

            <md-tab id="tab-friends" md-label="Shortcut(User)">
                <shortcutuser/>
            </md-tab>

            <md-tab id="tab-tags" md-label="Shortcut(Tag)">
                Posts tab
                <p>Qui, voluptas repellat impedit ducimus earum at ad architecto consectetur perferendis aspernatur iste amet ex tempora animi, illum tenetur quae assumenda iusto.</p>
            </md-tab>

            <md-tab id="tab-source-stores" md-label="Source Store">
                Favorites tab
                <p>Maiores, dolorum. Beatae, optio tempore fuga odit aperiam velit, consequuntur magni inventore sapiente alias sequi odio qui harum dolorem sunt quasi corporis.</p>
            </md-tab>
            </md-tabs>
        </div>
    `,
    computed: {
        backgroundStyle: function() {
            return {
                border: '3px solid #aaa'
            }
        },
        titleStyle: function() {
            return {
                backgroundColor: '#78f'
            }
        }
    }
})