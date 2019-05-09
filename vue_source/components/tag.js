Vue.component('tag', {
    props: ['title', 'tags', 'page'],
    template: `<div :style="styling" @click="routePath">{{title}}</div>`,
    methods: {
        getPost() {
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
    },
    methods:{
        routePath(page){
          routeApp.currentRoute = '/' + this.page;
        }
    }
})