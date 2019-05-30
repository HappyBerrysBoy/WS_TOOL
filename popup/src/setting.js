$('.ui.checkbox').change(function() {
  let obj = new Object();
  $('.ui.checkbox').each(function() {
    let name = $(this).attr('name');
    let val = $(this)
      .find('input')
      .is(':checked');
    obj[name] = val;
  });

  chrome.storage.sync.set(obj, () => console.log('VP value saved.'));

  let action = 'displayControl';
  let currName = $(this).attr('name');
  const currVal = $(this)
    .find('input')
    .is(':checked');

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        action,
        data: {
          name: currName,
          val: currVal,
        },
      },
      function(response) {
        console.log(
          `SendMessage to content : ${action}, ${currName}, ${currVal}`,
        );
      },
    );
  });
});

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

// Popup Loading시 값 적용
chrome.storage.sync.get(
  ['displayFunction', 'steemVP', 'sctVP', 'aaaVP'],
  function(result) {
    const { displayFunction, steemVP, sctVP, aaaVP } = result;
    $('.ui.checkbox').each(function() {
      let name = $(this).attr('name');
      $(this)
        .find('input')
        .attr('checked', result[name]);
    });
  },
);
