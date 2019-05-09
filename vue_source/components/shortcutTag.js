const wstools_users = 'wstools_users';

Vue.component('shortcuttag', {
    data() {
        return {
            users: [],
            active: false,
            value: null
        }
    },
    created() {
        const items = localStorage.getItem(wstools_users);

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
            localStorage.setItem(wstools_users, JSON.stringify(this.users));
        },
        delUser(txt) {
            localStorage.setItem(wstools_users, JSON.stringify(this.users));
        }
    }
})