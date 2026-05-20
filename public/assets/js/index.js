const listInput = document.getElementById('listInput');
const listButton = document.getElementById('listButton');
const listContainer = document.getElementById('listContainer');

let listEl;
let listCheckmark;
let listText;
let listDelete;
let listEdit;

const getList = () =>
  fetch('/api/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderList = () => {
    getList()
    .then((response) => response.json())
    .then((data) => {
        listContainer.innerHTML = '';
        data.forEach((item) => {
        listEl = document.createElement('div');
        listCheckmark = document.createElement('img');
        listText = document.createElement('p');
        listDelete = document.createElement('img');
        listEdit = document.createElement('img');

        listCheckmark.setAttribute('src', './assets/images/checkmark.png');
        listText.textContent = item.text;
        listDelete.setAttribute('src', './assets/images/delete.png');
        listEdit.setAttribute('src', './assets/images/edit.png');

        listContainer.appendChild(listEl);
        listEl.appendChild(listCheckmark);
        listEl.appendChild(listText);
        listEl.appendChild(listDelete);
        listEl.appendChild(listEdit);
        });
    });
};

renderList();