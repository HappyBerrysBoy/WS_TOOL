Vue.use(VueMaterial.default)

var app = new Vue({
    el: '#app',
    data: {
        message: '안녕하세요 Vue!',
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
                // history.pushState({}, "Category", "category");
            console.log(this);
            this.showCategory = true;
        },
        userShortcut() {
            this.showUserShortcut = !this.showUserShortcut;
            this.showTagShortcut = false;
        },
        tagShortcut() {
            routeApp.currentRoute = '/home';
            // this.showUserShortcut = false;
            // this.showTagShortcut = !this.showTagShortcut;
        }
    }
});