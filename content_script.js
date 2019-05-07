const content = `
<!DOCTYPE html>
<html>
  <head>
    <title>Vue Sample</title>
  </head>
  <body>
    <div id="apptest" style="position:relative;top:150px;height:200px;">
      {{ message }}
    </div>

    <script>
      new Vue({
        el: '#apptest',
        data: {
          message: 'Hello Vue.js!'
        }
      })
    </script>
  </body>
</html>

`;

document.getElementsByClassName('App__content')[0].insertAdjacentHTML('beforebegin', content);