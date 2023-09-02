const form = document.querySelector('form');
const input = document.querySelector('.input-text');
const ul = document.querySelector('ul');
const modal = document.querySelector('.modal');


let todos = [];
form.addEventListener('submit',(e) => {
  e.preventDefault()
todos.push({text:input.value,check:false,id:Date.now()})
input.value = ''
localStorage.setItem('todos', JSON.stringify(todos));
createTodo(todos)
})

function createTodo(todos){
    let li = document.createElement('li');
    todos.forEach((item) => {
        li.innerHTML = `
        <span class="li-text">${item.text}</span>
       <span class="check">
         <svg
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           stroke-width="1.5"
           stroke="currentColor"
           class="w-6 h-6"
         >
           <path
             stroke-linecap="round"
             stroke-linejoin="round"
             d="M4.5 12.75l6 6 9-13.5"
           />
         </svg>
       </span>
       <span class="edit">
         <svg
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           stroke-width="1.5"
           stroke="currentColor"
           class="w-6 h-6"
         >
           <path
             stroke-linecap="round"
             stroke-linejoin="round"
             d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
           />
         </svg>
       </span>
       <span class="delete""
         ><svg
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           stroke-width="1.5"
           stroke="currentColor"
           class="w-6 h-6"
         >
           <path
             stroke-linecap="round"
             stroke-linejoin="round"
             d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
           />
         </svg>
       </span>`
    })
    ul.appendChild(li);
    isCheck()
    deleteItem()
    editItem()
}

function isCheck(){
    const check = document.querySelectorAll('.check');
    check.forEach(item => {
        item.addEventListener('click', (e) => {
           let parent = e.currentTarget.parentElement;
           parent.classList.toggle('check');
        })
    }) 
}


function deleteItem(){
    const deleteI = document.querySelectorAll('.delete');
    deleteI.forEach((item) => {
        item.addEventListener('click', (e) => {
            let parent = e.currentTarget.parentElement;
            const content =  parent.textContent.trim();
            if (localStorage.getItem('todos')) {
              todos = JSON.parse(localStorage.getItem('todos'));
            } else {
              todos = [];
            }
            console.log(todos);
            todos = todos.filter(item => item.text !== content)
            localStorage.setItem('todos', JSON.stringify(todos))
            parent.remove();
         })
    })
}


function editItem(){
  const editI = document.querySelectorAll('.edit');
  editI.forEach((item) => {
      item.addEventListener('click', (e) => {          
          let parent = e.currentTarget.parentElement;
          const liText = parent.querySelector(".li-text")
          const value = parent.textContent.trim();
          const form = document.querySelector('.edit-form')
          const input = modal.querySelector('input[type="text"]')
          const update = modal.querySelector('input[type="submit"]')
          input.value = value
          modal.style.display = 'flex'
          input.focus()
          form.addEventListener('submit', (e) => {
            e.preventDefault()
            liText.textContent = input.value
            modal.style.display = 'none'
          })
       })
  })
}


document.addEventListener('DOMContentLoaded',() => {
  if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
  } else {
    todos = [];
  }
  todos.forEach((item) => {
    let li = document.createElement('li');
      li.innerHTML = `
      <span class="li-text">${item.text}</span>
     <span class="check">
       <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke-width="1.5"
         stroke="currentColor"
         class="w-6 h-6"
       >
         <path
           stroke-linecap="round"
           stroke-linejoin="round"
           d="M4.5 12.75l6 6 9-13.5"
         />
       </svg>
     </span>
     <span class="edit">
       <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke-width="1.5"
         stroke="currentColor"
         class="w-6 h-6"
       >
         <path
           stroke-linecap="round"
           stroke-linejoin="round"
           d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
         />
       </svg>
     </span>
     <span class="delete""
       ><svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke-width="1.5"
         stroke="currentColor"
         class="w-6 h-6"
       >
         <path
           stroke-linecap="round"
           stroke-linejoin="round"
           d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
         />
       </svg>
     </span>`
     ul.appendChild(li);
    })
    isCheck()
    deleteItem()
    editItem()
  })