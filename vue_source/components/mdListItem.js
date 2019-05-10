Vue.component('listItem', {
    data() {
        return {
            showAccountInfo: false,
            showDialog: false,
            profileImage: ''
        }
    },
    props: ['account'],
    template: `
        <md-list-item>
            <md-avatar>
            <img :src="thumbnail" alt="People">
            </md-avatar>

            <span class="md-list-item-text">{{account}}</span>

            <md-dialog :md-active.sync="showDialog">
                <img :src="profileSrc" style="margin:20px 50px;" />
                <center>
                    <md-dialog-title>{{account}}</md-dialog-title>
                </center>

                <md-dialog-actions>
                    <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                </md-dialog-actions>
            </md-dialog>

            <md-button class="md-icon-button md-list-action" @click="accountInfo()">
                <md-icon class="md-primary">info</md-icon>
            </md-button>
            <md-button class="md-icon-button md-list-action" @click="goAccount()">
                <md-icon class="md-primary">forward</md-icon>
            </md-button>
            <md-button class="md-icon-button md-list-action" @click="removeAccount(account)">
                <md-icon class="md-accent">delete_forever</md-icon>
            </md-button>
        </md-list-item>
    `,
    methods: {
        async accountInfo() {
            const self = this;
            await steem.api.getAccounts([this.account], function(err, response) {
                if (err) {
                    alert('Steem API Error');
                    console.log(err);
                } else {
                    console.log(response);

                    let v = response[0];

                    let metadata;
                    try {
                        metadata = v.json_metadata && v.json_metadata !== '{}' ? JSON.parse(v.json_metadata) : '';
                    } catch (ex) {
                        metadata = '';
                    }

                    console.log('Meta.Profile.Image:' + metadata.profile.profile_image);

                    if (!metadata || metadata.profile.profile_image.indexOf('photos.google.com') > -1 ||
                        metadata.profile.profile_image.indexOf('.postimg.') > -1 ||
                        metadata.profile.profile_image.indexOf('.imgsafe.') > -1 ||
                        metadata.profile.profile_image.indexOf('.postimg.') > -1) {
                        self.profileImage = 'https://semantic-ui.com/images/wireframe/image.png';
                    } else {
                        self.profileImage = metadata.profile.profile_image;
                    }
                }
            });

            this.showDialog = true;
        },
        goAccount() {
            location.href = `/@${this.account}`;
        },
        removeAccount(account) {
            this.$emit('removeAccount', account);
        }
    },
    computed: {
        thumbnail() {
            return `https://steemitimages.com/u/${this.account}/avatar`;
        },
        profileSrc() {
            return this.profileImage;
        }
    }
})