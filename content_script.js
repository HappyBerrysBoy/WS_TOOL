(async () => {
  // const GRAPHQL_URL = "https://valued-night-238101.appspot.com";

  // const GetPostsQuery = `query 
  //   GetPosts($tags: [String!]!) {
  //     getPosts(
  //       tags: $tags
  //     ) {
  //       author
  //       permlink
  //       title
  //       author_reputation
  //       summary
  //       tags
  //       image
  //       created
  //       total_payout_value
  //       curator_payout_value
  //       pending_payout_value
  //       vote_count
  //       comment_count
  //     }
  // }`;

  // function getPosts(tags=["kr"], start=0, limit=10) {
  //   fetch(GRAPHQL_URL, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       query: GetPostsQuery,
  //       variables: { tags, start, limit },
  //     })
  //   })
  //     .then(r => r.json())
  //     .then(({ data }) => {
  //       const posts = data.getPosts;
  //       const postsDom = posts.map(post => {
  //         return `<li>
  //           <div class='articles__summary'>
  //             <div class='articles__summary-header'>
  //               <div class='user'>
  //                 <div class="user__col user__col--left">
  //                   <a class="user__link" href="/@${post.author}"><div class="Userpic" style="background-image: url(&quot;https://steemitimages.com/u/${post.author}/avatar/small&quot;);"></div></a></div>
  //                 <div class="user__col user__col--right">
  //                   <span class="user__name">
  //                     <span class="author">
  //                       <strong><a href="/@${post.author}">${post.author}</a></strong>
  //                       <span class="Reputation" title="평판">(${post.author_reputation})</span>
  //                     </span>
  //                   </span>
  //                   <span class="articles__tag-link">in&nbsp;<a href="/trending/kr">kr</a>&nbsp;•&nbsp;</span>
  //                   <a class="timestamp__link" href="/@${post.author}/${post.permlink}"><span class="timestamp__time"><span title="${post.created}" class="updated"><span>${post.created}</span></span></span></a>
  //                 </div>
  //               </div>
  //             </div>
  //             <div class='articles__content hentry with-image'>
  //               <div class='articles__content-block articles__content-block--img'>
  //                 <a class="articles__link" href="/@${post.author}/${post.permlink}"><span class="articles__feature-img-container"><picture class="articles__feature-img"><img srcset="${post.image}"></picture></span></a>
  //               </div>
  //               <div class='articles__content-block articles__content-block--text'>
  //                 <h2 class="articles__h2 entry-title"><a href="/@${post.author}/${post.permlink}">${post.title}</a></h2>
  //                 <div class="PostSummary__body entry-content"><a href="/@${post.author}/${post.permlink}">${post.summary}</a></div>
  //                 <div class=articles__summary-footer'>
                    
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </li>`
  //       });
  //       $("#posts_list > ul").html(postsDom);
  //     }); 
  // }

  // console.log("팝업 페이지의 DOM 접근 : ", $("header.Header").text());
  const cetegoryDom = $(`
  <div id="app">
    <title message="Whan Dev Team"></title>
    <tabs></tabs>
  </div>
  `);

  // cetegoryDom.find('a').click(evt => {
  //   // evt.preventDefault();
  //   const tags = evt.target.getAttribute('tags').split(',')
  //   getPosts(tags);
  // })

  $(".App__content").before(cetegoryDom);
})();