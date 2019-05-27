const VP_REGENERATION_SECS_STEEM = 432000;

const getAccount = username => {
  return fetch("https://api.steemit.com/", {
    method: "POST",
    body: JSON.stringify({
      id: 0,
      jsonrpc: "2.0",
      method: "call",
      params: ["database_api", "get_accounts", [[username]]]
    })
  })
    .then(r => r.json())
    .then(r => r.result && r.result.length && r.result[0]);
};

const getSCOTAccount = username => {
  return fetch("https://scot-api.steem-engine.com/@" + username).then(r =>
    r.json()
  );
};

const currentVotinPower = ({ last_vote_time, voting_power }) => {
  const elapsed = (Date.now() - new Date(last_vote_time + "Z")) / 1000;
  const vp = voting_power + (10000 * elapsed) / VP_REGENERATION_SECS_STEEM;
  return Math.min(vp / 100, 100).toFixed(2);
};

const getAccountAllInfo = () => {
  console.log("getAccountAllInfo");
  const username = $("#username")
    .val()
    .trim();
  if (Boolean(username)) {
    Promise.all([getAccount(username), getSCOTAccount(username)]).then(
      ([steem, scot]) => {
        console.log(steem, scot);
        if (scot["SCT"]) {
          const steemVp = currentVotinPower(steem);
          const sctVp = currentVotinPower(scot["SCT"]);
          $("#steem_vp")
            .progress({
              percent: parseFloat(steemVp)
            })
            .end()
            .find(".progress")
            .text(`${steemVp}%`);
          $("#scot_vp")
            .progress({
              percent: parseFloat(sctVp)
            })
            .end()
            .find(".progress")
            .text(`${sctVp}%`);
        }

        chrome.storage.sync.set(
          {
            USERNAME: username
          },
          () => console.log("Value is set to ", username)
        );
      }
    );
  }
};

// 사이트에서 계정 가져오기
// chrome.extension.sendMessage({ action: "getUsername" });
$("#searchAccount").click(() => {
  getAccountAllInfo();
});

chrome.storage.sync.get("USERNAME", ({ USERNAME: username }) => {
  console.log("USERNAME", username);
  $("#username").val(username);
});

$("document").ready(() => getAccountAllInfo());
