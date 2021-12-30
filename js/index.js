function visitLink(path) {
	try {
    if (!localStorage.getItem(path)) {
      localStorage.setItem(path, '1');
    } else {
      localStorage.setItem(path, (parseInt(localStorage.getItem(path)) + 1).toString());
    }
  } catch (e) {
    throw new Error('Local storage is full. It has to be cleared in order to proceed')
  }
}

function viewResults() {
	const contentBlock = document.querySelector('#content');
  const allKeys = [];
  let keysList = getListHTMLElement();
  findKeysAndAddToList(keysList, allKeys);
  
  if (keysList.children.length > 0) {
    contentBlock.appendChild(keysList);
  }
  
  for (let i = 0; i < allKeys.length; i++) {
    localStorage.removeItem(allKeys[i]);
  }
}

function getListHTMLElement() {
  let keysList;
  if (!document.querySelector('#clicksStatList')) {
    keysList = document.createElement('ul');
    keysList.id = 'clicksStatList';
  } else {
    keysList = document.querySelector('#clicksStatList');
    keysList.innerHTML = '';
  }
  return keysList;
}

function findKeysAndAddToList(keysList, allKeys) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (/^Page\d+$/.test(key)) {
      const listItem = document.createElement('li');
      listItem.textContent = `You visited ${key} ${localStorage.getItem(key)} time(s)`;
      keysList.appendChild(listItem);
      allKeys.push(key);
    }
  }
}
