Vue.component('shortcutuser', {
    data() {
        return {
            users: [],
            regiAccount: '',
            active: false,
            value: null
        }
    },
    created() {
        const items = localStorage.getItem(WSTOOLS_USER_KEY);

        if (items) {
            this.users = JSON.parse(items);
        }
    },
    props: ['placeholder', 'icon'],
    template: `
        <div>
        <md-dialog-prompt
            :md-active.sync="active"
            v-model="value"
            md-title="Input account."
            md-input-maxlength="16"
            md-input-placeholder="Type account name..."
            @md-confirm="insertUser"
            md-confirm-text="Add" />

        <md-button class="md-primary md-raised" @click="active = true">Add</md-button>

        <md-list class="md-dense">
            <md-divider class="md-inset"></md-divider>

            <div v-for="user in users">
                <list-item :account="user" @removeAccount="removeAccountEvent"/>
            </div>
        </md-list>
        </div>
    `,
    methods: {
        insertUser() {
            this.users.push(this.value);
            this.users = Array.from(new Set(this.users));
            localStorage.setItem(WSTOOLS_USER_KEY, JSON.stringify(this.users));
        },
        removeAccountEvent(account) {
            const idx = this.users.indexOf(account);
            this.users.splice(idx, 1);
            localStorage.setItem(WSTOOLS_USER_KEY, JSON.stringify(this.users));
        }
    }
})