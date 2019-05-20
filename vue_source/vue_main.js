Vue.use(VueMaterial.default)

(new Vue({
    el: '#app',
    data: {
        show: false,
        menuIcon: 'menu',
        showUserShortcut: false,
        showTagShortcut: false,
        showTagFilter: false,
        showCategory: false,
        showGetMarkdown: false,
        showFamilySite: false,
        showRunUrl: false,
        tagFilterList: []
    },
    created() {
        this.tagFilterList = JSON.parse(localStorage.getItem(WSTOOLS_POST_FILTER_KEY));
    },
    mounted() {
        window.addEventListener("hashchange", () => {
            console.log(location.hash)
            this.showCategory = location.hash === "#category"
        }, false);

        window.document.body.addEventListener('resize', () => {
            alert('test');
        });

        $('.App__content').resize(function() {
            alert('zdzxc;lksjdf');
        });

        // Tag Filter Scheduler(3 sec)
        setInterval(() => {
            console.log('Run tag filter..');

            const tagFilterList = JSON.parse(localStorage.getItem(WSTOOLS_POST_FILTER_KEY));

            if ($('#posts_list ul li:eq(0)').find('.timestamp__link').attr('href') == undefined) return;

            // 최초 아이템은 따로 삭제 해준다.
            if (tagFilterList.indexOf($('#posts_list ul li:eq(0)').find('.timestamp__link').attr('href').split('/')[1]) > -1) {
                $('#posts_list ul li:eq(0)').remove();
            }

            $('#posts_list ul li:eq(0)').siblings().each((idx, item) => {
                if (item.querySelector('.articles__content-block--ad')) item.querySelector('.articles__content-block--ad').remove();

                if (tagFilterList.indexOf($(item).find('.timestamp__link').attr('href').split('/')[1]) > -1) {
                    $(item).remove();
                }
            });
        }, 3000);
    },
    methods: {
        allClose() {
            this.showUserShortcut = false;
            this.showTagShortcut = false;
            this.showTagFilter = false;
            this.showGetMarkdown = false;
            this.showFamilySite = false;
            this.showRunUrl = false;
        },
        showMenu() {
            this.show = !this.show;
            if (this.show) {
                this.menuIcon = 'cancel';
            } else {
                this.menuIcon = 'menu';
            }
        },
        goCategory() {
            alert('멋진 모습으로 개발중..!!');
            // window.open(`https://anpigon.github.io/steemit-community/#/`);
        },
        userShortcut() {
            this.allClose();
            this.showUserShortcut = true;
        },
        tagFilter() {
            this.allClose();
            this.showTagFilter = true;
        },
        tagShortcut() {
            this.allClose();
            this.showTagShortcut = true;
        },
        getMarkdown() {
            this.allClose();
            this.showGetMarkdown = true;
        },
        goFamilySite() {
            this.allClose();
            this.showFamilySite = true;
        },
        closeShortcutUser() {
            this.showUserShortcut = false;
        },
        runUrl() {
            this.allClose();
            this.showRunUrl = true;
        }
    }
}))()