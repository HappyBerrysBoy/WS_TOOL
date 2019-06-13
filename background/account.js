// // Scot 추가시 여기에 추가
// const functionList = [
//   'userShortcut',
//   'tagShortcut',
//   'tagFilter',
//   'getMarkdown',
//   'goFamilySite',
// ];

// const vpList = ['STEEM', 'SCT', 'AAA', 'WEED', 'SPT', 'ACTNEARN', 'BLQ', 'PAL'];
// const scotList = ['SCT', 'AAA', 'WEED', 'SPT', 'ACTNEARN', 'BLQ', 'PAL'];

const VP_REGENERATION_SECS_STEEM = 432000;
const VP_REGENERATION_SECS_SCT = 216000;
const VP_REGENERATION_SECS_SCOT_MAP = {};

const getAccount = username => {
  return fetch('https://api.steemit.com/', {
    method: 'POST',
    body: JSON.stringify({
      id: 0,
      jsonrpc: '2.0',
      method: 'call',
      params: ['database_api', 'get_accounts', [[username]]],
    }),
  })
    .then(r => r.json())
    .then(r => r.result && r.result.length && r.result[0]);
};

const getSCOTAccount = username => {
  return fetch('https://scot-api.steem-engine.com/@' + username).then(r =>
    r.json(),
  );
};

const currentVotinPower = ({ last_vote_time, voting_power, symbol }) => {
  const elapsed = (Date.now() - new Date(last_vote_time + 'Z')) / 1000;
  let regenerationSec = 0;
  if (!symbol) {
    // symbol이 없으면 steem
    regenerationSec = VP_REGENERATION_SECS_STEEM;
  } else if (symbol === 'SCT') {
    // SCT는 절반으로 줄임(네트워크에서 정보를 가져오지만 못가져올 경우를 대비해서 디폴트값을 셋팅)
    regenerationSec =
      VP_REGENERATION_SECS_SCOT_MAP['SCT'] || VP_REGENERATION_SECS_SCT;
  } else {
    // 그외 scot는 아직 미정
    regenerationSec =
      VP_REGENERATION_SECS_SCOT_MAP[symbol] || VP_REGENERATION_SECS_STEEM;
  }
  const vp = voting_power + (10000 * elapsed) / regenerationSec;
  return Math.min(vp / 100, 100).toFixed(2);
};

fetch('https://scot-api.steem-engine.com/config')
  .then(r => r.json())
  .then(results => {
    for (result of results) {
      VP_REGENERATION_SECS_SCOT_MAP[result.token] =
        result.vote_regeneration_seconds;
    }
    console.log(
      'VP_REGENERATION_SECS_SCOT_MAP:',
      VP_REGENERATION_SECS_SCOT_MAP,
    );
  });

// 업보팅 금액 계산하기
const calculatorUpvoteValue = (
  global,
  price,
  rewardFund,
  account,
  votePower,
  voteWeight = 100,
) => {
  const steemVp = votePower || currentVotinPower(account);
  let rate = parseInt((parseFloat(steemVp) * 100 * (voteWeight * 100)) / 1e4);
  rate = parseInt((rate + 49) / 50) * 100; // 변환식(?)
  const totalVestingFundSteem = parseFloat(global.total_vesting_fund_steem);
  const totalVestingShares = parseFloat(global.total_vesting_shares);
  const steemPrice = parseFloat(price.base) / parseFloat(price.quote);
  const rewardBalance = parseFloat(rewardFund.reward_balance);
  const recentClaims = parseFloat(rewardFund.recent_claims);
  const vestingSteem = steem.formatter.vestingSteem(account, global);
  const receivedVestingSteem = steem.formatter.vestToSteem(
    account.received_vesting_shares,
    global.total_vesting_shares,
    global.total_vesting_fund_steem,
  );
  const delegatedVestingSteem = steem.formatter.vestToSteem(
    account.delegated_vesting_shares,
    global.total_vesting_shares,
    global.total_vesting_fund_steem,
  );
  const totalVestingSteem =
    vestingSteem + receivedVestingSteem - delegatedVestingSteem;
  const upvoteValue =
    (totalVestingSteem / (totalVestingFundSteem / totalVestingShares)) *
    rate *
    (rewardBalance / recentClaims) *
    steemPrice;
  return upvoteValue;
};

// 스팀 파워 계산
const calculatorSteemPower = (global, account) => {
  const vestingSteem = steem.formatter.vestingSteem(account, global);
  const receivedVestingSteem = steem.formatter.vestToSteem(
    account.received_vesting_shares,
    global.total_vesting_shares,
    global.total_vesting_fund_steem,
  );
  const delegatedVestingSteem = steem.formatter.vestToSteem(
    account.delegated_vesting_shares,
    global.total_vesting_shares,
    global.total_vesting_fund_steem,
  );
  return {
    vestingSteem,
    receivedVestingSteem,
    delegatedVestingSteem,
  };
};
