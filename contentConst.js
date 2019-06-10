// Global Vars
const WSTOOLS_ACCOUNT = 'wstools_account';
const WSTOOLS_TAG_KEY = 'wstools_tags';
const WSTOOLS_USER_KEY = 'wstools_users';
const WSTOOLS_POST_FILTER_KEY = 'wstools_post_filter_key';
const WSTOOLS_URL_STORAGE = 'wstools_url_storage';

// Steem Condensor Site List
const sites = [
  {
    site: 'steemit.com/',
    scot: false,
    unit: 'Steem',
    context: 'https://steemit.com/',
    textareaSelector: "document.getElementsByClassName('upload-enabled')[0]",
    contentArea: '.App__content',
  },
  {
    site: 'steemcoinpan.com/',
    scot: true,
    unit: 'SCT',
    context: 'https://steemcoinpan.com/',
    textareaSelector: "document.getElementsByClassName('upload-enabled')[0]",
    contentArea: '.App__content',
  },
  {
    site: 'triplea.reviews/',
    scot: true,
    unit: 'AAA',
    context: 'https://triplea.reviews/',
    textareaSelector: "document.getElementsByClassName('upload-enabled')[0]",
    contentArea: '.App__content',
  },
  {
    site: 'steemkr.com/',
    scot: false,
    unit: 'Steem',
    context: 'https://steemkr.com/',
    textareaSelector: "document.getElementsByName('body')[0]",
  },
  {
    site: 'busy.org/',
    scot: false,
    unit: 'Steem',
    context: 'https://busy.org/',
    textareaSelector: "document.getElementById('body')",
    contentArea: '.content',
  },
  {
    site: 'splintertalk.io/',
    scot: true,
    unit: 'SPT',
    context: 'https://splintertalk.io/',
    textareaSelector: "document.getElementById('body')",
    contentArea: '.App__content',
  },
  // {
  //   site: 'steempeak.com/',
  //   scot: false,
  //   unit: 'Steem',
  //   context: 'https://steempeak.com/',
  //   textareaSelector: "document.getElementById('body')",
  //   contentArea: '#app',
  // },
];
