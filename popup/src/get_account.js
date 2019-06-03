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
    const sscClient = new SSC('https://api.steem-engine.com/rpc/');

    Promise.all([
      steem.api.getDynamicGlobalPropertiesAsync(),
      steem.api.getCurrentMedianHistoryPriceAsync(),
      steem.api.getRewardFundAsync('post'),
      getAccount(username),
      getSCOTAccount(username),
      sscClient.find('tokens', 'balances', { account: username }),
    ]).then(
      ([global, price, rewardFund, account, scotAccount, sccBalances]) => {
        console.log({ account, scotAccount, sccBalances });
        if (!account) return;

        const steemVp = currentVotinPower(account);
        showVotingProgress('#steem_vp', steemVp, 'STEEM');

        // 보팅파워 남은 재생시간
        const remainHours =
          ((10000 - parseFloat(steemVp) * 100) * (5 * 60 * 60 * 24)) /
          (60 * 60 * 10000);

        // console.log({ global, price, rewardFund });

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

        // SCOT 보팅 파워
        for (scotInfo of Object.values(scotAccount)) {
          const sctSymbol = scotInfo.symbol;
          if (['SCT', 'AAA'].includes(sctSymbol)) {
            // 보팅 파워
            const sctVotingPower = currentVotinPower(scotInfo);
            showVotingProgress(`#${sctSymbol}_vp`, sctVotingPower, sctSymbol);
          }
        }

        // SCOT 잔액
        const scotListHtml = [];
        const _sccBalances = sccBalances
          .filter(e => e.balance > 0)
          .sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance)); // 필터링 및 내림차순으로 정렬
        for (sccBalance of _sccBalances) {
          // SCOT 정보
          scotListHtml.push(`
            <div class="title">
            <i class="dropdown icon"></i>
            ${sccBalance.balance} ${sccBalance.symbol}
            </div>`);
          const scotInfo = scotAccount[sccBalance.symbol];
          if (scotInfo) {
            scotListHtml.push(`
              <div class="content">
                <p class="item">
                  <div class="ui horizontal label">Staked</div> 
                  <b>${parseFloat(sccBalance.stake).toFixed(3)} ${
              sccBalance.symbol
            }</b>
                <p/>
                <p class="item">
                  <div class="ui horizontal label">Pending Unstaked</div> 
                  <b>${parseFloat(sccBalance.pendingUnstake).toFixed(3)}</b>
                </p>
                <p class="item">
                  <div class="ui horizontal label">Pending Claim</div> 
                  <b>${(scotInfo.pending_token / 1000).toFixed(3)}</b>
                </p>
              </div>`);
          } else {
            scotListHtml.push(`<div class="content"></div>`);
          }
        }
        $('#scotList')
          .html(scotListHtml.join(''))
          .accordion({
            selector: {
              trigger: '.title .icon',
            },
          });

        $('#accountLoader').hide();

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

// SCOT 환경 변수 가져오기
// const ssc = new SSC('https://api.steem-engine.com/rpc/');
