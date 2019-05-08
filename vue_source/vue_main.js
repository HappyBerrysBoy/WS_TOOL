Vue.use(VueMaterial.default)

var app = new Vue({
    el: '#app',
    data: {
        message: '안녕하세요 Vue!',
        show: false,
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
        test() {
            alert('test');
        }
    }
});