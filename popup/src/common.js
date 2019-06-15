/**
 * Search Same Item srcList
 * @param name A  String to be found in the list
 * @return Number Item Index(Not exist return -1)
 */
getItemIndex = (list, name) => {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].getName() === name) {
      return i;
    }
  }

  return -1;
};

/**
 * Add At Sign Function
 * @param str A string for checking atsign
 * @return str string with atsign
 */
addAtSign = str => {
  str = str.trim();
  if (str && str.substr(0, 1) != '@') return '@' + str;
  else return str;
};

// Set Default Current Site
// Set Default Site Textarea Selector
let siteSelector = "document.getElementsByClassName('upload-enabled')[0]";
let currContext = 'https://steemit.com/';

/**
 * Set Textarea Selector from chrome tabs
 * @param tab chrometab
 */
chrome.tabs.getSelected(null, tab => {
  sites.forEach(v => {
    if (tab.url.indexOf(v.site) > -1) {
      currContext = v.context;
      siteSelector = v.textareaSelector;
    }
  });
});

// Animate.css extend in Jquery
$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});
