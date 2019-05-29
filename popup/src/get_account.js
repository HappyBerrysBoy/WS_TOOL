// 보팅 파워 보이기
const showVotingProgress = (target, value) => {
  $(target)
    .progress({
      percent: parseFloat(value),
    })
    .end()
    .find('.progress')
    .text(`${value}%`);
};

// 계정 정보 가져오기
const getAccountAllInfo = username => {
  console.log('getAccountAllInfo');
  if (Boolean(username)) {
    Promise.all([getAccount(username), getSCOTAccount(username)]).then(
      ([steem, scot]) => {
        console.log(steem, scot);
        if (!steem) return;

        const steemVp = currentVotinPower(steem);
        showVotingProgress('#steem_vp', steemVp);

        if (scot['SCT']) {
          const sctVp = currentVotinPower(scot['SCT']);
          showVotingProgress('#scot_vp', sctVp);
        }

        chrome.storage.sync.set(
          {
            USERNAME: username,
          },
          () => console.log('Value is set to ', username),
        );
      },
    );
  }
};

$('#searchAccount').click(() => {
  const username = $('#username')
    .val()
    .trim();
  getAccountAllInfo(username);
});

// 로컬 스토리지에서 조회
chrome.storage.sync.get('USERNAME', ({ USERNAME: username }) => {
  console.log('USERNAME', username);
  $('#username').val(username);
  getAccountAllInfo(username);
});
