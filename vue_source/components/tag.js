Vue.component('tag', {
    props: ['title', 'tags'],
    template: `<a href="#" :style="styling" @click="getPost">{{title}}</a>`,
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
    }
})