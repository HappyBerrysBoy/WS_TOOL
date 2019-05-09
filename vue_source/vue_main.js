Vue.use(VueMaterial.default)

let currentPath = '/about';

const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '<p>home page</p>' }
const About = { template: '<p>about page</p>' }

const routes = {
    '/home': Home,
    '/about': About,
    '/notfound':NotFound
  }

var routeApp = new Vue({
  el: '#routeTest',
  data: {
    currentRoute: currentPath
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  methods:{
    goPage(page){
        debugger;
        this.currentRoute = page;
    }
  },
  render (h) { return h(this.ViewComponent) }
});

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
            routeApp.currentRoute = '/home';
            // this.showUserShortcut = false;
            // this.showTagShortcut = !this.showTagShortcut;
        }
    }
});








{/* <template>
  <div class="container">
    <ul>
      <li>
        <v-link href="/">Home</v-link>
        <v-link href="/about">About</v-link>
      </li>
    </ul>

    <slot></slot>
  </div>
</template>

<script>
  import VLink from '../components/VLink.vue'
  export default {
    components: {
      VLink
    }
  }
</script> */}