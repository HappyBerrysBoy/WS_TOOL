const styles = {
    container: `
        position: absolute;
        top: ${document.querySelector('.headroom-wrapper').style.height};
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 1;
    `
}
Vue.component('category', {
  template: `
    <div style='${styles.container}'>
      <div class='App__content'>
        <center>
          <tag title="전체" tags="" page="home" /> | &nbsp
          <tag title="일상" tags="kr-life, life" page="about" /> | &nbsp
          <tag title="도서" tags="kr-book, book, booksteem" page="test" /> | &nbsp
          <tag title="게임" tags="kr-game, game" /> | &nbsp
          <tag title="코딩" tags="kr-dev, dev" /> | &nbsp
          <tag title="예술" tags="kr-art, art" />
        </center>
        <div id="routeTest" style="width:200px;height:100px;background-color:#ccc;">
        </div>
        <div class='PostsIndex row layout-list'>
          <article class="articles">
          </article>
        </div>
      </div>
    </div>
  `
})