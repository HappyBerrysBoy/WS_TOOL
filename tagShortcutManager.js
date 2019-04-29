/**
 * Tag Shortcut Function
 * @param storagekey Localstorage key for saving tag
 * @param table An table element for tag list
 * @param inputid An input element for entering tag
 * @param addbtn An button element for adding tag
 * @param delBtn An button element for deleting tag
 */
!function(storagekey, table, inputid, addbtn, delbtn){
  // Shortcut List
  let tagShortcutList = [];
  tagShortcutList = JSON.parse(localStorage.getItem(storagekey));

  if(!tagShortcutList){
    tagShortcutList = [];
  }

  // Shortcut <Tdiv> Format
  const tagShortcutFormat = '<div style="margin:5px;" class="ui small teal basic button tagShortcutitem">{{id}}</div>';

  addbtn.addEventListener('click', addTagShortcut);
  
  refresh();

  /**
  * Add Tag Shortcut Function and Save Localstorage
  */
  function addTagShortcut() {
    const tagid = inputid.value.trim();
    if(!tagid) {
      alert('Please Input Tagid');
      return;
    }

    if(tagShortcutList.indexOf(tagid) > -1){
      alert('Already Exist!!');
      inputid.focus();
      return;
    } 

    tagShortcutList.push(tagid);
    localStorage.setItem(storagekey, JSON.stringify(tagShortcutList));

    refresh();
  }

  /**
  * Remove Tag Button Click Event
  */
  delbtn.addEventListener('click', v => {
    const tmp = inputid.value.trim();
    const index = tagShortcutList.indexOf(tmp);
    tagShortcutList.splice(index, 1);
    localStorage.setItem(storagekey, JSON.stringify(tagShortcutList));

    refresh();
  });

  /**
  * Add Enter Keypress Event
  * @param e event
  */
  inputid.addEventListener('keypress', (v, e) =>{
    if(v.keyCode === 13){
      addTagShortcut();
    }
  });

  /**
  * Go Target Tag Page
  */
  function goTagPageClick(e){
    const tagid = e.target.innerHTML;
    chrome.tabs.executeScript(null, {code:'location.href="' + currContext + 'trending/' + tagid + '"'});
    window.close();
  }

  function refresh(){
    table.innerHTML = '';

    // Append Shortcut <div> HTML into Shortcut Table
    tagShortcutList.forEach(v =>{
      table.insertAdjacentHTML('beforeend', tagShortcutFormat.replace(/{{id}}/g, v));
    });

    const shortcutBtns = document.getElementsByClassName('tagShortcutitem');
    for(let i=0; i<shortcutBtns.length; i+=1){
      shortcutBtns[i].addEventListener('click', goTagPageClick);
    }

    inputid.value = '';
    inputid.focus();
  }
}(STORAGE_TAG_LIST, 
  document.getElementById('tagShortcutList'), 
  document.getElementById('tagID'), 
  document.getElementById('addTagShortcut'), 
  document.getElementById('removeTagShortcut'));