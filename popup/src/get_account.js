let accountArray = [];
let precisionList = {
  AAA: 4,
  PAL: 3,
  SPT: 6,
  ACTNEARN: 2,
  BATTLE: 0,
  BLQ: 8,
  DOLPHIN: 8,
  ENG: 8,
  LASSECASH: 8,
  LEO: 3,
  MOT: 8,
  SCT: 3,
  SPORTS: 3,
  WEED: 8,
  ZZAN: 5,
  SAGO: 8,
  IV: 8,
  TMT: 0,
};

// 보팅 파워 보이기
const showVotingProgress = (target, value, symbol) => {
  $(target).progress({
    percent: parseFloat(value),
    text: {
      percent: `${value}% ${symbol}`,
    },
  });
};

const renderSteemTokens = (tokens = [], filterSymbol = ['SCT']) => {
  for (token of tokens) {
    if (filterSymbol.includes(token.symbol)) {
      const tokenHtml = [];
      const metadata = JSON.parse(token.metadata || '{}');

      // 토큰명
      tokenHtml.push(`<p class="item">
        <div class="ui horizontal label">Name</div> 
        ${
          metadata.icon
            ? `<img class="ui avatar image" alt="${metadata.icon} 토큰 아이콘" src="${metadata.icon}">`
            : ''
        }
        <b>${token.name}</b>
      <p/>`);
      // 토큰 심볼
      // tokenHtml.push(`<p class="item">
      //   <div class="ui horizontal label">Symbol</div>
      //   <b>${token.symbol}</b>
      // <p/>`);
      // 토큰 발행자
      tokenHtml.push(`<p class="item">
        <div class="ui horizontal label">Issuer</div> 
        <a href='https://steemit.com/@${token.issuer}' target='_blank'>@${token.issuer}</a>
      <p/>`);
      // 토큰 홈페이지
      if (metadata.url) {
        tokenHtml.push(`<p class="item">
          <div class="ui horizontal label">URL</div> 
          <a href='${metadata.url}' target='_blank'>${metadata.url}</a>
        <p/>`);
      }
      // 토큰 설명
      if (metadata.desc) {
        tokenHtml.push(`<p class="item">
          <div class="ui horizontal label">Desc</div> 
          ${metadata.desc}
        <p/>`);
      }
      $(`#${token.symbol}_content`).html(tokenHtml);
    }
  }
};

// 계정 정보 가져오기
const getAccountAllInfo = username => {
  console.log('getAccountAllInfo');
  if (Boolean(username)) {
    $('#accountLoader').show();
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
        if (!account) {
          $('#accountLoader').hide();
          return alert('사용자가 존재하지 않습니다.');
        }

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

        // Steem SBD Balance
        $('#steemSbdBalance').html(
          `<b>${account.balance}/${account.sbd_balance}</b>`,
        );

        // Saving Steem SBD Balance
        $('#steemSbdSavingBalance').html(
          `<b>${account.savings_balance}/${account.savings_sbd_balance}</b>`,
        );

        // 스팀 파워 계산
        const sp = calculatorSteemPower(global, account);
        const steemPowerHtml = [];
        steemPowerHtml.push(
          `<b>${comma(sp.vestingSteem.toFixed(2))} STEEM</b>`,
        );
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
          .filter(e => {
            e.totalBalance =
              parseFloat(e.balance) +
              parseFloat(e.stake || 0) +
              parseFloat(e.delegationsOut || 0);
            return e.totalBalance > 0;
          })
          .sort(
            (a, b) => parseFloat(b.totalBalance) - parseFloat(a.totalBalance),
          ); // 필터링 및 내림차순으로 정렬

        const filterSymbols = [];
        for (sccBalance of _sccBalances) {
          const symbol = sccBalance.symbol;
          filterSymbols.push(symbol);

          // SCOT 정보
          const scotInfo = scotAccount[symbol];
          scotListHtml.push(`
            <div class="title">
              <i class="dropdown icon"></i>
              <span class='symbol' symbol="${symbol}">${symbol} 
                ${
                  scotInfo && scotInfo.pending_token
                    ? `<div class="mini ui primary button btnClaim">Claim Pending Token(${(
                        scotInfo.pending_token /
                        10 ** precisionList[symbol]
                      ).toFixed(1)})</div>`
                    : ''
                }
              </span>
              <span class='price'>${comma(
                sccBalance.totalBalance.toFixed(3),
              )}</span>
            </div>`);
          if (scotInfo) {
            scotListHtml.push(`
              <div class="content">
                <p class="item">
                  <div class="ui horizontal label">Staked/Unstaked</div> 
                  <b>${parseFloat(sccBalance.stake).toFixed(3)}/${parseFloat(
              sccBalance.balance,
            ).toFixed(3)} ${symbol}</b>
                <p/>
                <p class="item">
                  <div class="ui horizontal label">Pending Claim</div> 
                  <b>${(
                    scotInfo.pending_token /
                    10 ** precisionList[symbol]
                  ).toFixed(3)}</b>
                </p>
                <p class="item">
                  <div class="ui horizontal label">Delegations In/Out</div> 
                  <b>
                    ${parseFloat(
                      sccBalance.delegationsIn ? sccBalance.delegationsIn : 0,
                    ).toFixed(3)} / ${parseFloat(
              sccBalance.delegationsOut ? sccBalance.delegationsOut : 0,
            ).toFixed(3)} ${symbol}
                  </b>
                </p>
                <p class="item">
                  <div class="ui horizontal label">Pending Unstaked</div> 
                  <b>${parseFloat(
                    sccBalance.pendingUnstake ? sccBalance.pendingUnstake : 0,
                  ).toFixed(3)} ${symbol}</b>
                </p>
                <p class="item">
                  <div class="ui horizontal label">Pending Undelegations</div> 
                  <b>${parseFloat(
                    sccBalance.pendingUndelegations
                      ? sccBalance.pendingUndelegations
                      : 0,
                  ).toFixed(3)} ${symbol}</b>
                </p>
                <div class='ui divider' />
                <div id='${symbol}_content'>Loading...</div>
              </div>`);
          } else {
            scotListHtml.push(
              `<div class="content"><div id='${symbol}_content'>Loading...</div></div>`,
            );
          }
        }
        $('#scotList')
          .html(scotListHtml.join(''))
          .accordion({
            selector: {
              trigger: '.title',
            },
          });

        // Claim Eventlistener
        $('.btnClaim').on('click', function(e) {
          e.stopPropagation();
          const symbol = $(this)
            .parent()
            .attr('symbol');
          console.log(symbol);
          window.open(
            `https://app.steemconnect.com/sign/custom-json?id=scot_claim_token&json=%7B%22symbol%22%3A%22${symbol}%22%7D`,
          );
        });

        chrome.storage.local.get(
          'STEEM_ENGINE_TOKENS',
          ({ STEEM_ENGINE_TOKENS: tokens }) => {
            // console.log('STEEM_ENGINE_TOKENS', tokens);
            renderSteemTokens(tokens, filterSymbols);
          },
        );

        $('#accountLoader').hide();

        sscClient
          .find('tokens', 'tokens', {
            /*symbol:'SCT'*/
          })
          .then(tokens => {
            // chrome.storage.sync.set({
            console.log(tokens);

            chrome.storage.local.set({
              STEEM_ENGINE_TOKENS: tokens,
            });

            renderSteemTokens(tokens, filterSymbols);
          });

        chrome.storage.sync.set(
          {
            USERNAME: username,
          },
          () => console.log('Value is set to ', username),
        );
      },
    );
  } else {
    $('#accountLoader').hide();
  }
};

// Popup.html 실행시 최초 저장된 계정정보 가져옴
chrome.storage.sync.get('accountArray', function(result) {
  console.log('Value currently is ' + result['accountArray']);
  if (!result['accountArray']) return;
  accountArray = result['accountArray'] ? result['accountArray'] : [];
  result['accountArray'].forEach(account => {
    addAccountItem(account);
  });
});

// 로컬 스토리지에서 조회
chrome.storage.sync.get('USERNAME', ({ USERNAME: username }) => {
  console.log('USERNAME', username);
  $('#username').val(username);
  getAccountAllInfo(username);
});

// Username 입력 후 Enter 치면 바로 Add
$('#username').keydown(key => {
  if (key.keyCode == 13) {
    addAccount(
      $('#username')
        .val()
        .trim(),
    );
  }
});

// AddAccount Event 추가
$('#addAccount').click(() => {
  addAccount(
    $('#username')
      .val()
      .trim(),
  );
});

function addAccount(username) {
  if (accountArray.indexOf(username) > -1) return;

  accountArray.push(username);
  addAccountItem(username);
  $('#username').val('');
}

function addAccountItem(username) {
  const itemTemplet = `<button class="ui right labeled blue icon button accountItem" account="{{account}}" style="padding-left:7px!important;padding-right:27px!important;">
  <i class="icon deletableItem">X</i>
  {{account}}
</button>`;

  $('#shortcutList').append(itemTemplet.replace(/{{account}}/g, username));

  addAccountItemEvent();

  chrome.storage.sync.set({ accountArray: accountArray }, () => {
    console.log('added account ', accountArray);
  });
}

function addAccountItemEvent() {
  $('.deletableItem').off('click');
  $('.accountItem').off('click');

  $('.deletableItem').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    const username = $(this)
      .parent()
      .attr('account');

    accountArray.splice(accountArray.indexOf(username), 1);
    chrome.storage.sync.set({ accountArray: accountArray }, () => {
      console.log('added account ', accountArray);
    });

    $(this)
      .parent()
      .remove();
  });

  $('.accountItem').on('click', function() {
    $('#username').val($(this).attr('account'));
    getAccountAllInfo($(this).attr('account'));
  });
}

function searchAccount() {
  const username = $('#username')
    .val()
    .trim();
  getAccountAllInfo(username);
}

// SCOT 환경 변수 가져오기
// const ssc = new SSC('https://api.steem-engine.com/rpc/');
