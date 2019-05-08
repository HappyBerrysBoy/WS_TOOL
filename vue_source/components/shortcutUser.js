const wstools_users = 'wstools_users';

Vue.component('shortcutuser', {
    data() {
        return {
            users: []
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
        <md-chips 
            v-model="users" 
            @md-insert="insertUser" 
            @md-delete="delUser" 
            @md-click="goUser" 
            md-placeholder="Add user...">
        </md-chips>
    </div>`,
    methods: {
        goUser(txt) {
            location.href = `/@${txt}`;
        },
        insertUser(txt) {
            localStorage.setItem(wstools_users, JSON.stringify(this.users));
        },
        delUser(txt) {
            localStorage.setItem(wstools_users, JSON.stringify(this.users));
        }
    }
})