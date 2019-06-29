Vue.component('numBtn', {
  props: ['num', 'idx', 'styling'],
  template: `
      <div class="numBtn" :class="styling" @click="pressNum">
        {{num}}
      </div>`,
  methods: {
    pressNum() {
      this.$emit('press', this.num);
    },
  },
});
