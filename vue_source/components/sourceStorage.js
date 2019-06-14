Vue.component('sourceStorage', {
  data() {
    return {
      sourceName: '',
      isImage: true,
      sourceUrl: '',
    };
  },
  template: `
        <div>
          <div>
            <div style="float:left;"><h5>Save Image/HTML</h5></div>
            <md-button class="closeLocation" @click="closeEvent">
              <md-icon>close</md-icon>
            </md-button>
          </div>
        </div>

        <div>
            <div>
                <md-field>
                    <label>Input Name</label>
                    <md-input v-model="sourceName"></md-input>
                    <md-checkbox v-model="isImage">Image</md-checkbox>
                    <md-button class="md-accent md-mini md-raised" @click="addSource">Add</md-button>
                </md-field>
            </div>
            <table class="ui olive table">
                <tbody id="underlist">
                </tbody>
            </table>
            <div class="ui input">
                <input type="text" id="clipboard" style="display:none;" />
            </div>
        </div>


      `,
  methods: {
    closeEvent() {
      this.$emit('closefunc');
    },
  },
});
