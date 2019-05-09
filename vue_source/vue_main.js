Vue.use(VueMaterial.default)

var app = new Vue({
    el: '#app',
    data: {
        message: '안녕하세요 Vue!',
        show: false,
        showUserShortcut: false,
        showTagShortcut: false,
        menuIcon: 'menu'
    },
    methods: {
        showMenu() {
            this.show = !this.show;
            if (this.show) {
                this.menuIcon = 'cancel';
            } else {
                this.menuIcon = 'menu';
            }
        },
        userShortcut() {
            this.showUserShortcut = !this.showUserShortcut;
            this.showTagShortcut = false;
        },
        tagShortcut() {
            this.showUserShortcut = false;
            this.showTagShortcut = !this.showTagShortcut;
        }
    }
});