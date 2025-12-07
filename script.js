//your JS code here. If required.
(function(){
  const form = document.getElementById('book-form');
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const isbnInput = document.getElementById('isbn');
  const tbody = document.getElementById('book-list');
  const msgEl = document.getElementById('msg');

  function showMsg(text, duration = 2000){
    msgEl.textContent = text;
    msgEl.style.display = 'block';
    setTimeout(()=> {
      msgEl.style.display = 'none';
    }, duration);
  }

  // Load from localStorage if present
  function loadFromStorage(){
    try {
      const data = JSON.parse(localStorage.getItem('mybooks') || '[]');
      data.forEach(b => addRow(b.title, b.author, b.isbn, false));
    } catch(e){ /* ignore */ }
  }

  // Save current table to localStorage
  function saveToStorage(){
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const data = rows.map(r => {
      return {
        title: r.children[0].textContent,
        author: r.children[1].textContent,
        isbn: r.children[2].textContent
      };
    });
    localStorage.setItem('mybooks', JSON.stringify(data));
  }

  function addRow(title, author, isbn, save = true){
    const tr = document.createElement('tr');

    const tdTitle = document.createElement('td');
    tdTitle.textContent = title;
    tr.appendChild(tdTitle);

    const tdAuthor = document.createElement('td');
    tdAuthor.textContent = author;
    tr.appendChild(tdAuthor);

    const tdIsbn = document.createElement('td');
    tdIsbn.textContent = isbn;
    tr.appendChild(tdIsbn);

    const tdAction = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.className = 'delete';
    delBtn.type = 'button';
    delBtn.textContent = 'X';
    tdAction.appendChild(delBtn);
    tr.appendChild(tdAction);

    tbody.appendChild(tr);

    if(save) saveToStorage();
  }

  form.addEventListener('submit', function(ev){
    ev.preventDefault();

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const isbn = isbnInput.value.trim();

    if(!title || !author || !isbn){
      showMsg('Please fill all fields');
      return;
    }

    addRow(title, author, isbn, true);

    titleInput.value = '';
    authorInput.value = '';
    isbnInput.value = '';
    titleInput.focus();
  });

  // delete via event delegation
  tbody.addEventListener('click', function(e){
    if(e.target && e.target.classList.contains('delete')){
      const row = e.target.closest('tr');
      if(row){
        row.remove();
        saveToStorage();
      }
    }
  });

  // initialize
  loadFromStorage();
})();

