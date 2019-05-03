console.log("팝업 페이지의 DOM 접근 : ", $("header.Header").text());
$(".App__content").before(`
<div>
  <hr>
  <center>
  <a href="#">전체</a> |
  <a href="#">일상</a> |
  <a href="#">도서</a> |
  <a href="#">게임</a> |
  <a href="#">코딩</a> |
  <a href="#">예술</a> |
  </center>
  <hr>
</div>
`);