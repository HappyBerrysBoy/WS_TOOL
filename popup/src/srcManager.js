/**
 * User Source Manager
 * @param storageSrcKey Localstorage key for saving source list
 * @param defaultSrc Default image list for initial
 * @param srcTable An table element for source list
 * @param inputName An input element for entering source name
 * @param chkImage An checkbox element for checking image
 * @param inputSrc An input element for source content
 */
!(function(storageSrcKey, defaultSrc, srcTable, inputName, chkImage, inputSrc) {
  const eleTable = srcTable;
  let srcList = [];

  new Promise((resolve, reject) => {
    chrome.storage.sync.get('storageSrcKey', function(result) {
      console.log('getLocalItems', result.storageSrcKey);
      resolve(result.storageSrcKey);
    });
  }).then(items => {
    if (items) {
      items.forEach(item => {
        srcList.push(new Source(item.name, item.isImage, item.src));
      });
    } else {
      // Set Default SrcList
      srcList = defaultSrc;
      chrome.storage.sync.set({ storageSrcKey: srcList }, () =>
        console.log(`${storageSrcKey} value saved. List : ${srcList}`),
      );
    }

    console.log('1111');
    srcList.forEach(v => {
      console.log('2222');
      eleTable.insertAdjacentHTML(
        'beforeend',
        getImageItemHtml(v.getName(), v.getSrc(), v.getHtmlSrc()),
      );
    });

    /**
     * Add EventListener Each Button
     */
    console.log('3333');
    console.log(document);
    console.log(document.getElementsByClassName('addBtn'));
    console.log(document.getElementsByClassName('delBtn'));
    console.log('444444444');
    document.addEventListener('DOMContentLoaded', () => {
      const addBtns = document.getElementsByClassName('addBtn');
      const delBtns = document.getElementsByClassName('delBtn');
      for (let i = 0; i < addBtns.length; i += 1) {
        addBtns[i].addEventListener('click', addClick);
        delBtns[i].addEventListener('click', delClick);
      }
    });
  });

  /**
   * Initial Source Button Event
   */
  document.getElementById('initialSetting').addEventListener('click', v => {
    srcList = defaultSrc;
    chrome.storage.sync.set({ storageSrcKey: srcList }, () =>
      console.log(`${storageSrcKey} value saved. List : ${srcList}`),
    );
    window.close();
  });

  /**
   * Add Manual Source Button Event
   */
  document.getElementById('addManualSrc').addEventListener('click', v => {
    const name = inputName.value.trim();
    const isImage = chkImage.checked;
    const src = inputSrc.value;

    if (!name || !src) {
      alert('Please Input Name and Source');
      return;
    }
    if (getItemIndex(srcList, name) > -1) {
      alert('Name already exist. Please use another name.');
      return;
    }

    srcList.unshift(new Source(name, isImage, src));
    // localStorage.setItem(storageSrcKey, JSON.stringify(srcList));
    chrome.storage.sync.set({ storageSrcKey: srcList }, () =>
      console.log(`${storageSrcKey} value saved. List : ${srcList}`),
    );

    eleTable.insertAdjacentHTML(
      'afterbegin',
      getImageItemHtml(
        srcList[0].getName(),
        srcList[0].getSrc(),
        srcList[0].getHtmlSrc(),
      ),
    );

    document
      .getElementsByClassName('addBtn')[0]
      .addEventListener('click', addClick);
    document
      .getElementsByClassName('delBtn')[0]
      .addEventListener('click', delClick);
  });

  function getImageItemHtml(name, src, html) {
    return `<tr><td class="trName"><div style="font-size:1.5rem;float:left;">${name}</div>
    <div style="float:right;" class="ui circular medium orange icon button delBtn" name="${name}" src="${src}"><i class="icon trash alternate outline"></i></div>
    <div style="float:right;" class="ui circular medium green icon button addBtn" name="${name}" src="${src}"><i class="icon copy outline"></i></div>
    </td>
    <td class="trView">${html}</td></tr>`;
  }

  /**
   * Add Button Click Event
   * @param e add button click event
   */
  function addClick(e) {
    const src = e.target.parentElement.getAttribute('src');
    const itemIdx = getItemIndex(
      srcList,
      e.target.parentElement.getAttribute('name'),
    );
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
    $('#copied').animateCss(
      'flip',
      () => (setTimeout((copied.style.display = 'none')), 3000),
    );
  }

  /**
   * Delete Button Click Event
   * @param e del button click event
   */
  function delClick(e) {
    const index = getItemIndex(
      srcList,
      e.target.parentElement.getAttribute('name'),
    );

    console.log(index);

    if (index < 0) return;

    srcList.splice(index, 1);
    chrome.storage.sync.set({ storageSrcKey: srcList }, () =>
      console.log(`${storageSrcKey} value saved. List : ${srcList}`),
    );
    e.target.closest('tr').remove();
  }
})(
  STORAGE_IMAGE_LIST,
  defaultSrcList,
  document.getElementById('underlist'),
  document.getElementById('srcName'),
  document.getElementById('isImage'),
  document.getElementById('manualSrc'),
);
