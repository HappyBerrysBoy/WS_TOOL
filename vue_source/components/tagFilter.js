Vue.component('tagFilter', {
    data() {
        return {
            tags: [],
            active: false,
            value: null
        }
    },
    created() {
        const items = localStorage.getItem(WSTOOLS_POST_FILTER_KEY);

        if (items) {
            this.tags = JSON.parse(items);
        }
    },
    template: `
        <div style="margin:5px 10px;">
            <h5>Input Tag Filter</h5>
            <md-chips 
                v-model="tags" 
                md-placeholder="Add tag..." 
                @md-insert="insertTag" 
                @md-delete="deleteTag">
            </md-chips>
        </div>
    `,
    methods: {
        insertTag(){
            localStorage.setItem(WSTOOLS_POST_FILTER_KEY, JSON.stringify(this.tags));
        },
        deleteTag(){
            localStorage.setItem(WSTOOLS_POST_FILTER_KEY, JSON.stringify(this.tags));
        },
        closeEvent() {
            // this.$emit('closeShortcutUserEvent');
        }
    }
})