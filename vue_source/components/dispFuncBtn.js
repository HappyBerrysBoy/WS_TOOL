Vue.component('dispFuncBtn', {
  data() {
    return {};
  },
  props: ['name', 'text', 'icon'],
  creates() {
    this.$emit('doEvent(name)');
  },
  template: `
        <div class="funcBtn" name="name">
            <md-button class="md-icon-button" @click="funcInfo(name)">
                <md-icon>{{icon}}</md-icon>
                <md-tooltip md-direction="right">{{text}}</md-tooltip>
            </md-button>
        </div>
      `,
  methods: {
    funcInfo(name) {
      this.$emit('funcinfo', name);
    },
  },
});
