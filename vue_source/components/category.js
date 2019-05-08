Vue.component('category', {
    template: `
        <div>
            <center>
                <tag title="전체" tags="" /> | &nbsp
                <tag title="일상" tags="kr-life, life" /> | &nbsp
                <tag title="도서" tags="kr-book, book, booksteem" /> | &nbsp
                <tag title="게임" tags="kr-game, game" /> | &nbsp
                <tag title="코딩" tags="kr-dev, dev" /> | &nbsp
                <tag title="예술" tags="kr-art, art" />
                <md-button class="md-raised">전체</md-button>
                <md-button class="md-raised">일상</md-button>
                <md-button class="md-raised">도서</md-button>
                <md-button class="md-raised">게임</md-button>
                <md-button class="md-raised">코딩</md-button>
                <md-button class="md-raised">예술</md-button>
            </center>
        </div>
    `
})