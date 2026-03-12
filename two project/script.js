// Minimal to-do app with localStorage
(function(){
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  const STORAGE_KEY = 'small-html-project-todos';

  function load(){
    try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] }catch(e){return[]}
  }

  function save(items){ localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) }

  function render(){
    const items = load();
    list.innerHTML = '';
    items.forEach((item, idx)=>{
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.className = 'task-text' + (item.done? ' completed':'');
      span.textContent = item.text;

      const actions = document.createElement('div'); actions.className='actions';
      const toggle = document.createElement('button'); toggle.textContent = item.done? 'Undo':'Done';
      toggle.onclick = ()=>{ items[idx].done = !items[idx].done; save(items); render() };
      const del = document.createElement('button'); del.textContent = 'Delete';
      del.onclick = ()=>{ items.splice(idx,1); save(items); render() };

      actions.appendChild(toggle); actions.appendChild(del);
      li.appendChild(span); li.appendChild(actions);
      list.appendChild(li);
    })
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const text = input.value.trim(); if(!text) return;
    const items = load();
    items.push({text,done:false}); save(items); input.value=''; render();
  });

  // initial render
  render();
})();
