Vue.component('shortcuttag', {
    data() {
        return {
            users: [],
            active: false,
            value: null
        }
    },
    created() {
        const items = localStorage.getItem(WSTOOLS_TAG_KEY);

        if (items) {
            this.users = JSON.parse(items);
        }
    },
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

            <mdListItem account="wonsama"/>
        </md-list>
        </div>
    `,
    methods: {
        goUser(txt) {
            location.href = `/@${txt}`;
        },
        insertUser() {
            this.users.push(this.value);
            localStorage.setItem(WSTOOLS_TAG_KEY, JSON.stringify(this.users));
        },
        delUser(txt) {
            localStorage.setItem(WSTOOLS_TAG_KEY, JSON.stringify(this.users));
        }
    }
})