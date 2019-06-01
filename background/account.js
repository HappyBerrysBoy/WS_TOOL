const VP_REGENERATION_SECS_STEEM = 432000;
const VP_REGENERATION_SECS_SCT = 216000;

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
    // SCT는 절반으로 줄임
    regenerationSec = VP_REGENERATION_SECS_SCT;
  } else {
    // 그외 scot는 아직 미정
    regenerationSec = VP_REGENERATION_SECS_STEEM;
  }
  const vp = voting_power + (10000 * elapsed) / regenerationSec;
  return Math.min(vp / 100, 100).toFixed(2);
};
