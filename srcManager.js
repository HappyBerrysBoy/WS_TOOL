/**
 * User Source Manager
 * @param storageSrcKey Localstorage key for saving source list
 * @param defaultSrc Default image list for initial
 * @param srcTable An table element for source list
 * @param inputName An input element for entering source name
 * @param chkImage An checkbox element for checking image
 * @param inputSrc An input element for source content
 */
!function(storageSrcKey, defaultSrc, srcTable, inputName, chkImage, inputSrc){
  let srcList = [];
  const getLocalItems = localStorage.getItem(storageSrcKey);

  if(getLocalItems){
    try{
      const jsonList = JSON.parse(getLocalItems);
      jsonList.forEach((v, idx) => {
        if(v.name){
            srcList.push(new Source(v.name, v.isImage, v.src));
        }else{
            // 1.1.4 previous version conversion
            srcList.push(new Source('No' + (idx+1), true, v));
        }
      });
      localStorage.setItem(storageSrcKey, JSON.stringify(srcList));
    }catch(e){
      // Set Default SrcList
      srcList = defaultSrc;
      localStorage.setItem(storageSrcKey, JSON.stringify(srcList));
    }
  }else{
    // Set Default SrcList
    srcList = defaultSrc;
    localStorage.setItem(storageSrcKey, JSON.stringify(srcList));
  }

  const trFormat = [];
  trFormat.push('<tr><td class="trName"><div style="font-size:1.5rem;float:left;">{{name}}</div>');
  trFormat.push('<div style="float:right;" class="ui circular medium orange icon button delBtn" name="{{name}}" src="{{src}}"><i class="icon trash alternate outline"></i></div>');
  trFormat.push('<div style="float:right;" class="ui circular medium green icon button addBtn" name="{{name}}" src="{{src}}"><i class="icon copy outline"></i></div>');
  trFormat.push('</td>');
  trFormat.push('<td class="trView">{{view}}</td></tr>');

  const eleTable = srcTable;

  // Insert Image <TR> HTML
  srcList.forEach(v =>{
    eleTable.insertAdjacentHTML('beforeend', trFormat.join('').replace(/{{name}}/g, v.getName())
                                                              .replace(/{{view}}/g, v.getHtmlSrc())
                                                              .replace(/{{src}}/g, v.getSrc()));
  });

  /**
  * Initial Source Button Event
  */
  document.getElementById('initialSetting').addEventListener('click', v =>{
    srcList = defaultSrc;
    localStorage.setItem(storageSrcKey, JSON.stringify(srcList));
    window.close();
  });

  /**
  * Add Manual Source Button Event
  */
  document.getElementById('addManualSrc').addEventListener('click', v =>{
    const name = inputName.value.trim();
    const isImage = chkImage.checked;
    const src = inputSrc.value;

    if(!name || !src) {
      alert('Please Input Name and Source');
      return;
    }

    if(getItemIndex(srcList, name) > -1){
      alert('Name already exist. Please use another name.')
      return;
    }

    srcList.unshift(new Source(name, isImage, src));
    localStorage.setItem(storageSrcKey, JSON.stringify(srcList));

    eleTable.insertAdjacentHTML('afterbegin', trFormat.join('').replace(/{{name}}/g, srcList[0].getName())
                                                              .replace(/{{view}}/g, srcList[0].getHtmlSrc())
                                                              .replace(/{{src}}/g, srcList[0].getSrc())
    );

    document.getElementsByClassName('addBtn')[0].addEventListener('click', addClick);
    document.getElementsByClassName('delBtn')[0].addEventListener('click', delClick);
  });

  /**
  * Add EventListener Each Button
  */
 document.addEventListener('DOMContentLoaded', () => {
    const addBtns = document.getElementsByClassName('addBtn');
    const delBtns = document.getElementsByClassName('delBtn');
    for (let i = 0; i < addBtns.length; i+=1) {
      addBtns[i].addEventListener('click', addClick);
      delBtns[i].addEventListener('click', delClick);
    }
  });

  /**
  * Add Button Click Event
  * @param e add button click event
  */
  function addClick(e) {
    const src = e.target.parentElement.getAttribute('src');
    const itemIdx = getItemIndex(srcList, e.target.parentElement.getAttribute('name'));
    const script = srcList[itemIdx].isImage ? '![](' + src + ')' : src;
    const clipboard = document.getElementById('clipboard');
    clipboard.style.display = 'block';
    clipboard.value = script;
    clipboard.select();
    document.execCommand('copy');
    clipboard.style.display = 'none';

    const copied = document.getElementById('copied');
    copied.style.display = 'inline-block';

    // Apply Animation
    $('#copied').animateCss('flip', (() => (setTimeout(copied.style.display = 'none'), 3000)));
  }

  /**
  * Delete Button Click Event
  * @param e del button click event
  */
  function delClick(e){
    const index = getItemIndex(srcList, e.target.parentElement.getAttribute('name'));
    
    if(index < 0) return;

    srcList.splice(index, 1);
    localStorage.setItem(storageSrcKey, JSON.stringify(srcList));
    e.target.closest('tr').remove();
  }
}(STORAGE_IMAGE_LIST, 
  defaultSrcList,
  document.getElementById('underlist'), 
  document.getElementById('srcName'), 
  document.getElementById('isImage'), 
  document.getElementById('manualSrc'));

