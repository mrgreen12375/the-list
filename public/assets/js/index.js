const listInput = document.getElementById('listInput');
const listButton = document.getElementById('listButton');
const listContainer = document.getElementById('listContainer');

let editingId = null;

const getList = () =>
  fetch('/api/list', {
    method: 'GET',
  });

  const renderList = () => {
    getList()
      .then((response) => response.json())
      .then((data) => {
        listContainer.innerHTML = '';
  
        data.forEach((item) => {
          const listEl = document.createElement('div');
          const listText = document.createElement('p');
          const updateEl = document.createElement('div');
          const listDelete = document.createElement('img');
          const listEdit = document.createElement('img');
  
          listEl.dataset.id = item.id;
          listEl.classList.add('listEl');
  
          listText.textContent = item.text;
          listText.style.textDecoration = item.checked ? 'line-through' : 'none';

          listDelete.src = './assets/images/delete.png';
          listEdit.src = './assets/images/edit.png';
          
          listText.addEventListener('click', strikeThrough);
          listEdit.addEventListener('click', editList);
          listDelete.addEventListener('click', deleteFromList);
  
          listContainer.appendChild(listEl);
          listEl.appendChild(listText);
          listEl.appendChild(updateEl);
          updateEl.appendChild(listDelete);
          updateEl.appendChild(listEdit);
        });
      });
  };

const strikeThrough = (e) => {
  const itemId = e.target.parentElement.dataset.id;

  const isChecked = e.target.style.textDecoration === 'line-through';

  putList(itemId, { checked: !isChecked, text: e.target.textContent});
};

const postList = (text) => {
    fetch('/api/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    }).then(renderList);
}

const addToList = () => {
  const text = listInput.value.trim();

  if (!text) return;

  if (editingId) {
    putList(editingId, { text });
    editingId = null;
    listButton.textContent = 'Add to List';
  } else {
    postList(text);
  }

  listInput.value = '';
};

const putList = (id, updates) => {
    fetch(`/api/list/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    }).then(renderList);
}

const editList = (e) => {
  const itemId = e.target.closest('.listEl').dataset.id;
  const itemText = e.target.closest('.listEl').querySelector('p').textContent;

  listInput.value = itemText;
  editingId = itemId;

  listButton.textContent = 'Update';
};

const deleteList = (id) => {
    fetch(`/api/list/${id}`, {
        method: 'DELETE',
    }).then(renderList);
}

const deleteFromList = (e) => {
  const itemId = e.target.closest('.listEl').dataset.id;
  deleteList(itemId);
};

renderList();

listButton.addEventListener('click', addToList);
