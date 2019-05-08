Vue.component('tabs', {
    template: `
        <div>
            <md-tabs md-sync-route>
            <md-tab id="tab-category" md-label="Category">
                <category></category>
            </md-tab>

            <md-tab id="tab-friends" md-label="Friends">
                Pages tab
                <p>Unde provident nemo reiciendis officia, possimus repellendus. Facere dignissimos dicta quis rem. Aliquam aspernatur dolor atque nisi id deserunt laudantium quam repellat.</p>
            </md-tab>

            <md-tab id="tab-tags" md-label="Tags">
                Posts tab
                <p>Qui, voluptas repellat impedit ducimus earum at ad architecto consectetur perferendis aspernatur iste amet ex tempora animi, illum tenetur quae assumenda iusto.</p>
            </md-tab>

            <md-tab id="tab-source-stores" md-label="Source Store">
                Favorites tab
                <p>Maiores, dolorum. Beatae, optio tempore fuga odit aperiam velit, consequuntur magni inventore sapiente alias sequi odio qui harum dolorem sunt quasi corporis.</p>
            </md-tab>
            </md-tabs>
        </div>
    `
})