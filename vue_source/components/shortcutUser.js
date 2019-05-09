const wstools_users = 'wstools_users';

Vue.component('shortcutuser', {
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

            <md-list-item>
                <md-avatar>
                <img src="https://steemitimages.com/u/wonsama/avatar" alt="People">
                </md-avatar>

                <span class="md-list-item-text">wonsama</span>

                <md-button class="md-icon-button md-list-action" @click="goUser('wonsama')">
                    <md-icon class="md-primary">person_pin</md-icon>
                </md-button>
                <md-button class="md-icon-button md-list-action" @click="goUser('wonsama')">
                    <md-icon class="md-accent">delete_forever</md-icon>
                </md-button>
            </md-list-item>

            <md-list-item>
                <md-avatar>
                <img src="https://steemitimages.com/u/anpigon/avatar" alt="People">
                </md-avatar>

                <span class="md-list-item-text">anpigon</span>

                <md-button class="md-icon-button md-list-action">
                    <md-icon class="md-primary">person_pin</md-icon>
                </md-button>
                <md-button class="md-icon-button md-list-action" @click="goUser('wonsama')">
                    <md-icon class="md-accent">delete_forever</md-icon>
                </md-button>
            </md-list-item>

            <md-list-item>
                <md-avatar>
                <img src="https://steemitimages.com/u/newbijohn/avatar" alt="People">
                </md-avatar>

                <span class="md-list-item-text">newbijohn</span>

                <md-button class="md-icon-button md-list-action">
                    <md-icon class="md-primary">person_pin</md-icon>
                </md-button>
                <md-button class="md-icon-button md-list-action" @click="goUser('wonsama')">
                    <md-icon class="md-accent">delete_forever</md-icon>
                </md-button>
            </md-list-item>
        </md-list>
        </div>
    `,
    // template: `
    // <div>
    //     <md-chips 
    //         v-model="users" 
    //         @md-insert="insertUser" 
    //         @md-delete="delUser" 
    //         @md-click="goUser" 
    //         md-placeholder="Add user...">
    //     </md-chips>
    // </div>`,
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