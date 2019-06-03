// 보팅 파워 보이기
const showVotingProgress = (target, value, symbol) => {
  $(target).progress({
    percent: parseFloat(value),
    text: {
      percent: `${value}% ${symbol}`,
    },
  });
};

// 계정 정보 가져오기
const getAccountAllInfo = username => {
  console.log('getAccountAllInfo');
  if (Boolean(username)) {
    Promise.all([
      steem.api.getDynamicGlobalPropertiesAsync(),
      steem.api.getCurrentMedianHistoryPriceAsync(),
      steem.api.getRewardFundAsync('post'),
      getAccount(username),
      getSCOTAccount(username),
    ]).then(([global, price, rewardFund, account, scot]) => {
      console.log({ account, scot });
      if (!account) return;

      const steemVp = currentVotinPower(account);
      showVotingProgress('#steem_vp', steemVp, 'STEEM');

      // 보팅파워 남은 재생시간
      const remainHours =
        ((10000 - parseFloat(steemVp) * 100) * (5 * 60 * 60 * 24)) /
        (60 * 60 * 10000);

      if (scot['SCT']) {
        const sctVp = currentVotinPower(scot['SCT']);
        showVotingProgress('#scot_vp', sctVp, 'SCT');
      }

      if (scot['AAA']) {
        const aaaVp = currentVotinPower(scot['AAA']);
        showVotingProgress('#aaa_vp', aaaVp, 'AAA');
      }

      console.log({ global, price, rewardFund });

      // 명성 계산
      let reputation = parseInt(account.reputation);
      reputation =
        Math.max(Math.log10(Math.abs(reputation)) - 9, 0) *
          (reputation >= 0 ? 1 : -1) *
          9 +
        25;
      $('#reputation').html(
        `<b>${reputation.toFixed(3)}</b> (${account.post_count} posts)`,
      );

      // 스팀파워 계산
      const sp = calculatorSteemPower(global, account);
      const steemPowerHtml = [];
      steemPowerHtml.push(`<b>${sp.vestingSteem.toFixed(2)} STEEM</b>`);
      if (sp.receivedVestingSteem || sp.delegatedVestingSteem) {
        steemPowerHtml.push(' (');
        if (sp.receivedVestingSteem)
          steemPowerHtml.push(`+${sp.receivedVestingSteem.toFixed(2)}`);
        if (sp.delegatedVestingSteem)
          steemPowerHtml.push(` -${sp.delegatedVestingSteem.toFixed(2)}`);
        steemPowerHtml.push(')');
      }
      $('#steemPower').html(steemPowerHtml.join(''));

      // 보팅 가치 계산
      const upvoteValue = calculatorUpvoteValue(
        global,
        price,
        rewardFund,
        account,
      );
      const mapUpvoteValue = calculatorUpvoteValue(
        global,
        price,
        rewardFund,
        account,
        100,
        100,
      );
      $('#upvoteValue').html(
        `<b>$${upvoteValue.toFixed(3)}</b> ($${mapUpvoteValue.toFixed(3)})`,
      );

      chrome.storage.sync.set(
        {
          USERNAME: username,
        },
        () => console.log('Value is set to ', username),
      );
    });
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

// SCOT 환경 변수 가져오기
// const ssc = new SSC('https://api.steem-engine.com/rpc/');
