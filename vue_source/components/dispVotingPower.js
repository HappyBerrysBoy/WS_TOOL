Vue.component('dispVotingPower', {
  data() {
    return {};
  },
  props: ['vpstyle', 'percent', 'unit', 'url', 'favicon'],
  computed: {
    mark() {
      return this.unit.substring(0, 1);
    },
    vpPercentFixed() {
      if (!this.percent) return 0;
      return this.percent.toFixed(0);
    },
    val() {
      if (!this.percent) return 0;
      return this.percent;
    },
  },
  template: `
    <div @click="goScotSite(url)">
      <md-progress-spinner :class="vpstyle" md-mode="determinate" md-diameter="25" :md-value="val"></md-progress-spinner>
      <md-tooltip md-direction="top" class="tooltipZindex">{{unit}} {{val}}%</md-tooltip>
      <span class="vpMark"><img style="width:9px;border-radius:10px;" :src="favicon" /></span>
      <span class="vpPercent">{{vpPercentFixed}}%</span>
    </div>
    `,
  methods: {
    goScotSite(url) {
      window.open(url);
    },
  },
});
