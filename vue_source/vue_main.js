Vue.use(VueMaterial.default)

(new Vue({
    el: '#app',
    data: {
        show: false,
        menuIcon: 'menu',
        showUserShortcut: false,
        showTagShortcut: false,
        showCategory: false
    },
    mounted: function() {
        window.addEventListener("hashchange", () => {
            console.log(location.hash)
            this.showCategory = location.hash === "#category"
        }, false);
    },
    methods: {
        allClose() {
            this.showUserShortcut = false;
            this.showTagShortcut = false;
        },
        showMenu() {
            this.show = !this.show;
            if (this.show) {
                this.menuIcon = 'cancel';
            } else {
                this.menuIcon = 'menu';
            }
        },
        goCategory() {
            location.hash = 'category'
            console.log(this);
            this.showCategory = true;
        },
        userShortcut() {
            this.showUserShortcut = !this.showUserShortcut;
            this.showTagShortcut = false;
        },
        tagShortcut() {

        },
        closeShortcutUser() {
            this.showUserShortcut = false;
        }
    }
}))()