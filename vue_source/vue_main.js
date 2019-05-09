Vue.use(VueMaterial.default)

let currentPath = '/about';

const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '<title message="Home" />' }
const About = title;
const Test = { template: '<p>Test Page</p>' }

const routes = {
    '/home': Home,
    '/about': About,
    '/notfound':NotFound,
    '/test':Test
  }

var app = new Vue({
    el: '#app',
    data: {
        show: false,
        showUserShortcut: false,
        showTagShortcut: false,
        showCategory: false
    },
    mounted: function () {
        window.addEventListener("hashchange", () => {
            console.log(location.hash)
            this.showCategory = location.hash === "#category"
        }, false);
    },
    methods: {
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

import Title from './components/title.js'

var routeApp = new Vue({
    el: '#routeTest',
    data: {
      currentRoute: currentPath
    },
    computed: {
      ViewComponent () {
        //   return routes[this.currentRoute] || NotFound
        return Title
      }
    },
    methods:{
      goPage(page){
          this.currentRoute = page;
      }
    },
    render (h) { return h(this.ViewComponent) }
  });