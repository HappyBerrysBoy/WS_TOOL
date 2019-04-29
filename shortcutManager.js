/**
 * User Shortcut Function
 * @param storageUserKey Localstorage key for saving user ID
 * @param storageDetailValue Localstorage key for saving user detail value
 * @param userTable An table element for user list
 * @param inputid An input element for entering user
 * @param addbtn An button element for adding user
 * @param delBtn An button element for deleting user
 * @param sortBtn An button element for sorting user
 * @param chkDetail An checkbox element for user detail view
 */
!function(storageUserKey, storageDetailValue, userTable, inputId, addBtn, delBtn, sortBtn, chkDetail){
  // Define and Set Shortcut List from Localstorage
  let userShortcutList = [];
  const getStorageUserList = localStorage.getItem(storageUserKey);

  if(getStorageUserList){
    userShortcutList = JSON.parse(getStorageUserList);
  }else{
    userShortcutList = [];
  }

  addBtn.addEventListener('click', addUserShortcut);

  chkDetail.checked = localStorage.getItem(storageDetailValue) === 'true' ? true : false;

  refresh();

  /**
  * Add User Shortcut Function and Save Localstorage
  */
  function addUserShortcut() {
    const userid = addAtSign(inputId.value);
    if(!userid) {
      alert('Please Input Userid');
      return;
    }

    if(userShortcutList.indexOf(userid) > -1){
      alert('Already Exist!!');
      inputId.focus();
      return;
    } 

    // Check User ID exist
    steem.api.getAccounts([inputId.value], function(err, response){
      if(err || response.length === 0){
        alert('Check User ID');
        console.log(err);
      }else{
        console.log(response);
        userShortcutList.push(userid);
        localStorage.setItem(storageUserKey, JSON.stringify(userShortcutList));

        refresh();
        inputId.value = '';
        inputId.focus();
      }
    });
  }

  sortBtn.addEventListener('click', () => {
    if(!confirm('Do you want to sort IDs in ABC order? ')) return;
    userShortcutList.sort();
    localStorage.setItem(storageUserKey, JSON.stringify(userShortcutList));

    refresh();
  });

  /**
  * Remove User Button Click Event
  */
  delBtn.addEventListener('click', v => {
    const tmp = addAtSign(inputId.value);
    const index = userShortcutList.indexOf(tmp);
    userShortcutList.splice(index, 1);
    localStorage.setItem(storageUserKey, JSON.stringify(userShortcutList));

    const shortcutBtns = document.getElementsByClassName('shortcut');
    for(let i=0; i<shortcutBtns.length; i+=1){
      if(shortcutBtns[i].getAttribute('id') == tmp){
        shortcutBtns[i].remove();
        break;
      }
    }

    inputId.value = '';
    inputId.focus();
  });

  /**
  * Add Enter Keypress Event
  * @param e event
  */
  inputId.addEventListener('keypress', (v, e) =>{
    if(v.keyCode === 13){
      addUserShortcut();
    }
  });

  /**
  * Go Target User Page
  */
  function goUserPageClick(e){
    const userId = e.target.innerHTML;
    chrome.tabs.executeScript(null, {code:'location.href="' + currContext + userId + '"'});
    window.close();
  }

  chkDetail.addEventListener('click', (e) => {
    refresh();
    localStorage.setItem(storageDetailValue, e.target.checked);
  });

  /**
  * Refresh User Shortcut
  */
  function refresh() {
    if(userShortcutList.length == 0) return; 

    const shortcutTable = userTable;
    shortcutTable.innerHTML = '';

    if(chkDetail.checked){
      // Get User Info from Steemjs API
      steem.api.getAccounts(userShortcutList.map(v => v.replace(/@/g, '')), function(err, response){
        if(err){
          alert('Steem API Error');
          console.log(err);
        }else{
          console.log(response);
        }

        const userInfoHtmlFormat = [];
        response.forEach((v, i) => {
          let metadata;
          try{
            metadata = v.json_metadata && v.json_metadata !== '{}' ? JSON.parse(v.json_metadata) : '';
          }catch(ex){
            metadata = '';
          }
          userInfoHtmlFormat.push('<center><div class="ui card shortcut" id="@' + v.name + '" style="margin:5px;"><div class="image">');
          userInfoHtmlFormat.push('<div class="ui blue ribbon label"><i class="user icon"></i>');
          userInfoHtmlFormat.push('<a href="' + currContext + '@' + v.name + '" target="_blank">' + v.name + '</a></div>');

          if(!metadata || metadata.profile.profile_image.indexOf('photos.google.com') > -1 
                        || metadata.profile.profile_image.indexOf('.postimg.') > -1
                        || metadata.profile.profile_image.indexOf('.imgsafe.') > -1
                        || metadata.profile.profile_image.indexOf('.postimg.') > -1){
            userInfoHtmlFormat.push('<img src="{{src}}">'.replace(/{{src}}/g, 'https://semantic-ui.com/images/wireframe/image.png'));
          }else{
            userInfoHtmlFormat.push('<img src="{{src}}">'.replace(/{{src}}/g, metadata.profile.profile_image));
          }
          userInfoHtmlFormat.push('</div><div class="content">');
          userInfoHtmlFormat.push('<div class="header">Joined in {{date}}</div>'.replace(/{{date}}/g, v.created.substr(0, 10)));
          userInfoHtmlFormat.push('<div class="meta">');
          if(metadata){
            userInfoHtmlFormat.push(metadata.profile.about ? '<br>' + metadata.profile.about : '');
            userInfoHtmlFormat.push(metadata.profile.location ? '<br><span>Location</span> : ' + metadata.profile.location : '');
            userInfoHtmlFormat.push(metadata.profile.website ? '<br>Website : <a style="color:#00f;" href="' + metadata.profile.website + '" target="_blank">' + metadata.profile.website + '</a>' : '');
          }
          userInfoHtmlFormat.push('</div></div></div></center>');

          steem.api.getFollowCount(userShortcutList.map(v => v.replace(/@/g, '')), function(err, response){
            if(err){
              console.log(err);
            }else{
              console.log(response);
            }
          });
        });

        shortcutTable.insertAdjacentHTML('beforeend', userInfoHtmlFormat.join(''));
        $('#userDetailBtn').removeClass('loading');
      });
    }else{
      const shortcutFormat = '<div style="margin:5px;" class="ui small teal basic button shortcut" id="{{id}}">{{id}}</div>';
      userShortcutList.forEach(v =>{
        shortcutTable.insertAdjacentHTML('beforeend', shortcutFormat.replace(/{{id}}/g, v));
      });

      const shortcutBtns = document.getElementsByClassName('shortcut');
      for(let i=0; i<shortcutBtns.length; i+=1){
        shortcutBtns[i].addEventListener('click', goUserPageClick);
      }
    }
  }
}(STORAGE_USER_LIST, 
  DETAIL_CHECK_VALUE,
  document.getElementById('shortcutList'), 
  document.getElementById('userID'), 
  document.getElementById('addUserShortcut'),
  document.getElementById('removeUserShortcut'),
  document.getElementById('sortABC'),
  document.getElementById('userDetailBtn'));