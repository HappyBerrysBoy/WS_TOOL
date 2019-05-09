const wstools_tags = 'wstools_tags';

Vue.component('shortcuttag', {
    data() {
        return {
            users: [],
            active: false,
            value: null
        }
    },
    created() {
        const items = localStorage.getItem(wstools_tags);

        if (items) {
            this.users = JSON.parse(items);
        }
    },
    props: ['placeholder', 'icon'],
    template: `
        <div>
        
        </div>
    `,
    methods: {
        goUser(txt) {
            location.href = `/@${txt}`;
        },
        insertUser() {
            this.users.push(this.value);
            localStorage.setItem(wstools_tags, JSON.stringify(this.users));
        },
        delUser(txt) {
            localStorage.setItem(wstools_tags, JSON.stringify(this.users));
        }
    }
})