// Global Vars
const WSTOOLS_ACCOUNT = 'wstools_account';
const WSTOOLS_TAG_KEY = 'wstools_tags';
const WSTOOLS_USER_KEY = 'wstools_users';
const WSTOOLS_POST_FILTER_KEY = 'wstools_post_filter_key';
const WSTOOLS_URL_STORAGE = 'wstools_url_storage';

const functionList = [
  'userShortcut',
  'tagShortcut',
  'tagFilter',
  'getMarkdown',
  'goFamilySite',
  'sourceStorage',
];

// Scot 추가시 여기에 추가 First
const vpList = ['STEEM', 'SCT', 'AAA', 'WEED', 'SPT', 'ACTNEARN', 'BLQ', 'PAL'];
const scotList = ['SCT', 'AAA', 'WEED', 'SPT', 'ACTNEARN', 'BLQ', 'PAL'];

// Steem Condensor Site List
// Scot 추가시 여기에 추가 Second
const sites = [
  {
    site: 'steemit.com/',
    scot: false,
    unit: 'STEEM',
    url: 'https://www.steemit.com/',
    textareaSelector: "document.getElementsByClassName('upload-enabled')[0]",
    contentArea: '.App__content',
    favicon: 'https://steemit.com/images/favicons/favicon-16x16.png',
  },
  {
    site: 'steemcoinpan.com/',
    scot: true,
    unit: 'SCT',
    url: 'https://www.steemcoinpan.com/',
    textareaSelector: "document.getElementsByClassName('upload-enabled')[0]",
    contentArea: '.App__content',
    favicon: 'https://www.steemcoinpan.com/images/favicons/favicon-16x16.png',
  },
  {
    site: 'triplea.reviews/',
    scot: true,
    unit: 'AAA',
    url: 'https://www.triplea.reviews/',
    textareaSelector: "document.getElementsByClassName('upload-enabled')[0]",
    contentArea: '.App__content',
    favicon: 'https://www.triplea.reviews/images/favicons/favicon-16x16.png',
  },
  {
    site: 'steemkr.com/',
    scot: false,
    unit: 'STEEM',
    url: 'https://www.steemkr.com/',
    textareaSelector: "document.getElementsByName('body')[0]",
  },
  {
    site: 'busy.org/',
    scot: false,
    unit: 'STEEM',
    url: 'https://busy.org/',
    textareaSelector: "document.getElementById('body')",
    contentArea: 'body',
  },
  {
    site: 'steempeak.com/',
    scot: false,
    unit: 'STEEM',
    url: 'https://steempeak.com/',
    textareaSelector: "document.getElementById('body')",
    contentArea: 'body',
  },
  {
    site: 'splintertalk.io/',
    scot: true,
    unit: 'SPT',
    url: 'https://www.splintertalk.io/',
    textareaSelector: "document.getElementById('body')",
    contentArea: '.App__content',
    favicon: 'https://www.splintertalk.io/images/favicons/favicon-16x16.png',
  },
  {
    site: 'sct.tokenbb.io/',
    scot: true,
    unit: 'SCT',
    url: 'https://sct.tokenbb.io/',
    textareaSelector: "document.getElementById('body')",
    contentArea: 'body',
  },
  {
    site: 'actnearn.com/',
    scot: true,
    unit: 'ACTNEARN',
    url: 'https://www.actnearn.com/',
    textareaSelector: "document.getElementById('body')",
    contentArea: '.App__content',
    favicon: 'https://www.actnearn.com/images/favicons/favicon-16x16.png',
  },
  {
    site: 'weedcash.network/',
    scot: true,
    unit: 'WEED',
    url: 'https://www.weedcash.network/',
    textareaSelector: "document.getElementById('body')",
    contentArea: '.App__content',
    favicon: 'https://www.weedcash.network/images/favicons/favicon-16x16.png',
  },
  {
    site: 'bloque64.com/',
    scot: true,
    unit: 'BLQ',
    url: 'https://blogs.bloque64.com/',
    textareaSelector: "document.getElementById('body')",
    contentArea: '.App__content',
    favicon: 'https://blogs.bloque64.com/images/favicons/favicon-16x16.png',
  },
  {
    site: 'palnet.io/',
    scot: true,
    unit: 'PAL',
    url: 'https://www.palnet.io/',
    textareaSelector: "document.getElementById('body')",
    contentArea: '.App__content',
    favicon: 'https://www.palnet.io/images/favicons/favicon-16x16.png',
  },
];
