Vue.component('tagShortcut', {
  data() {
    return {
      tags: [],
      active: false,
      value: null,
    };
  },
  created() {
    const items = localStorage.getItem(WSTOOLS_TAG_KEY);

    if (items) {
      this.tags = JSON.parse(items);
    }
  },
  template: `
        <div style="margin:5px 10px;">
            <div>
              <h5>Input Tag for Shortcut</h5>
              <md-button class="closeLocation" @click="closeEvent">
                <md-icon>close</md-icon>
              </md-button>
            </div>
            <md-chips 
                v-model="tags" 
                md-placeholder="Add tag..." 
                @md-click="goTag"
                @md-insert="insertTag" 
                @md-delete="deleteTag">
            </md-chips>
        </div>
    `,
  methods: {
    insertTag() {
      localStorage.setItem(WSTOOLS_TAG_KEY, JSON.stringify(this.tags));
    },
    deleteTag() {
      localStorage.setItem(WSTOOLS_TAG_KEY, JSON.stringify(this.tags));
    },
    goTag(txt, idx) {
      location.href = `/trending/${txt}`;
    },
    closeEvent() {
      this.$emit('closefunc');
    },
  },
});
