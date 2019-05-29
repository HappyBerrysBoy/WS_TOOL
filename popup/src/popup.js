const MATCHE_URLS = [
  'https://steemit.com/*',
  'https://steemcoinpan.com/*',
  'https://www.steemcoinpan.com/*',
];
function checkMatcheUrl(tabUrl) {
  for (url of MATCHE_URLS) {
    if (new RegExp(url).test(tabUrl)) return true;
  }
  return false;
}

$('.tabular.menu .item').tab();
