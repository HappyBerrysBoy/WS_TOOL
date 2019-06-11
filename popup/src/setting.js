// Storage Value Change 이벤트인데.. 왠지 어디 쓰일수 있을 것 같아서..
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    console.log(
      'Storage key "%s" in namespace "%s" changed. ' +
        'Old value was "%s", new value is "%s".',
      key,
      namespace,
      storageChange.oldValue,
      storageChange.newValue,
    );
  }
});

// Popup Loading시 값 적용(Function Button)
chrome.storage.sync.get(functionList, function(result) {
  $('.vpBox .funcBtn').each(function() {
    let name = $(this).attr('name');
    $(this)
      .find('input')
      .prop('checked', result[name]);
  });
});

// Popup Loading시 값 적용(Scot List)
chrome.storage.sync.get(vpList, function(result) {
  $('.ui.checkbox').each(function() {
    let name = $(this).attr('name');
    $(this)
      .find('input')
      .prop('checked', result[name]);
  });
});
