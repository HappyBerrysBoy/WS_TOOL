Vue.component('tag', {
    props:['title', 'tags'],
    template:`<a href="#" :style="styling" @click="getPost">{{title}}</a>`,
    methods:{
        getPost(){
            const tags = this.tags.split(',');
            getPosts(tags);
        }
    },
    computed: {
        styling: function() {
            return {
                textDecoration: 'underline',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                marginRight: '5px'
            }
        }
    }
})

Vue.component('category', {
    template:`
        <div>
            <center>
                <tag title="전체" tags="" /> | &nbsp
                <tag title="일상" tags="kr-life, life" /> | &nbsp
                <tag title="도서" tags="kr-book, book, booksteem" /> | &nbsp
                <tag title="게임" tags="kr-game, game" /> | &nbsp
                <tag title="코딩" tags="kr-dev, dev" /> | &nbsp
                <tag title="예술" tags="kr-art, art" />
                <md-button class="md-raised">전체</md-button>
                <md-button class="md-raised">일상</md-button>
                <md-button class="md-raised">도서</md-button>
                <md-button class="md-raised">게임</md-button>
                <md-button class="md-raised">코딩</md-button>
                <md-button class="md-raised">예술</md-button>
            </center>
        </div>
    `
})

Vue.component('title', {
    props: ['message'],
    template: '<div>{{ message }}</div>'
})

Vue.component('tabs', {
    template:`
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
