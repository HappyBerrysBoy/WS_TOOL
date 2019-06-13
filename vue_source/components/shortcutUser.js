Vue.component('userShortcut', {
  data() {
    return {
      users: [],
      active: false,
      value: null,
    };
  },
  created() {
    const items = localStorage.getItem(WSTOOLS_USER_KEY);

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

        <md-button class="md-primary md-mini md-raised" @click="addUserEvent">Add Account</md-button>
        <md-button class="closeLocation" @click="closeEvent">
          <md-icon>close</md-icon>
        </md-button>

        <md-list class="md-dense">
            <md-divider class="md-inset"></md-divider>

            <div v-for="user in users">
                <list-item :account="user" @removeAccount="removeAccountEvent"/>
            </div>
        </md-list>
        </div>
    `,
  methods: {
    addUserEvent() {
      this.value = '';
      this.active = true;
    },
    insertUser() {
      const self = this;
      this.value = this.value.replace(/@/g, '');
      steem.api.getAccounts([this.value], function(err, response) {
        if (err || response.length === 0) {
          alert('Check Account ID');
          console.log(err);
        } else {
          console.log(response);
          self.users.push(self.value);
          self.users = Array.from(new Set(self.users));
          localStorage.setItem(WSTOOLS_USER_KEY, JSON.stringify(self.users));
        }
      });
    },
    removeAccountEvent(account) {
      const idx = this.users.indexOf(account);
      this.users.splice(idx, 1);
      localStorage.setItem(WSTOOLS_USER_KEY, JSON.stringify(this.users));
    },
    closeEvent() {
      this.$emit('closefunc');
    },
  },
});
