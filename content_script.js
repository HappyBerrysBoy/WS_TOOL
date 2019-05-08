(async() => {
    // console.log("팝업 페이지의 DOM 접근 : ", $("header.Header").text());
    const cetegoryDom = $(`
  <div id="app">
    <title message="Whan Dev Team"></title>
    <tabs></tabs>
  </div>
  `);

    $(".App__content").before(cetegoryDom);
})();