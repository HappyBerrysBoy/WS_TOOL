// Global Vars
const WSTOOLS_TAG_KEY = 'wstools_tags';
const WSTOOLS_USER_KEY = 'wstools_users';

// Steem Condensor Site List
const sites = [{
        site: "steemit.com/",
        context: "https://steemit.com/",
        textareaSelector: "document.getElementsByClassName('upload-enabled')[0]",
        contentArea: 'App__content'
    },
    {
        site: "steemkr.com/",
        context: "https://steemkr.com/",
        textareaSelector: "document.getElementsByName('body')[0]"
    },
    {
        site: "busy.org/",
        context: "https://busy.org/",
        textareaSelector: "document.getElementById('body')"
    }
];