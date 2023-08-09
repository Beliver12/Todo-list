//import _ from 'lodash';
import './style.css';
import './sidebar.css';
import './content.css';
import { format, compareAsc } from 'date-fns';
//import { formatDistance, subDays } from 'date-fns';
import { Project, myProjects } from './project';
import { Todo, myTodos } from './todos';
//import { values } from 'lodash';
import { populateStorage, setStyles } from './localstorage';

//formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });


export function component() {
  const container = document.querySelector('#container');
  const header = document.createElement('div');
  const footer = document.createElement('div');
  const title = document.createElement('h1');

  //sidebar DOM ====>
  const sidebar = document.createElement('div');
  const createProjectBox = document.createElement('div');
  const addProject = document.createElement('button');
  const projectBox = document.createElement('input');
  const displayProjectBox = document.createElement('div');
  //const testProject = document.createElement('button');
  //attributes ====>
  sidebar.setAttribute('id', 'sidebar');
  createProjectBox.setAttribute('id', 'createProjectBox');
  addProject.setAttribute('id', 'addProject');
  projectBox.setAttribute('id', 'projectBox');
  projectBox.setAttribute('required', 'true');
  displayProjectBox.setAttribute('id', 'displayProjectBox');
  //testProject.setAttribute('id', 'testProject');
  //<==== attributes
  //<==== sidebar DOM

  //content DOM ====>
  const content = document.createElement('div');
  const todoContent = document.createElement('div');
  todoContent.setAttribute('id', 'todoContent');
  const createModal = document.createElement('div');
  const modalContent = document.createElement('div');
  const popModule = document.createElement('button');
  const addTask = document.createElement('button');
  const updateTask = document.createElement('button');
  const exitModule = document.createElement('span');
  const taskTitle = document.createElement('input');
  const taskDate = document.createElement('input');
  const taskPriority = document.createElement('select');
  const priorityOption = document.createElement('option');
  const taskDescription = document.createElement('textarea');
  //attributes ====>
  content.setAttribute('id', 'content');
  taskTitle.setAttribute('id', 'taskTitle');
  taskTitle.setAttribute('placeholder', 'Title');
  taskTitle.setAttribute('required', 'true');
  taskDate.setAttribute('id', 'taskDate');
  taskDate.setAttribute('type', 'date');
  taskDate.setAttribute('required', 'true');
  addTask.setAttribute('id', 'addTask');
  createModal.setAttribute('id', 'myModal');
  modalContent.setAttribute('id', 'modal-content');
  popModule.setAttribute('id', 'popModule');
  taskDescription.setAttribute('placeholder', 'Description');
  taskDescription.setAttribute('id', 'description');
  taskDescription.setAttribute('required', 'true');
  priorityOption.setAttribute('id', 'priorityOption');
  taskPriority.setAttribute('id', 'select');
  //<====attributes

  //<==== content DOM

  header.setAttribute('id', 'header');
  footer.setAttribute('id', 'footer');

  container.appendChild(header);
  container.appendChild(sidebar);
  container.appendChild(footer);
  container.appendChild(content);
  header.appendChild(title);

  content.appendChild(popModule);
  content.appendChild(createModal);

  createModal.appendChild(modalContent);
  modalContent.appendChild(exitModule);
  modalContent.appendChild(taskTitle);
  modalContent.appendChild(taskDescription);
  modalContent.appendChild(taskDate);
  modalContent.appendChild(taskPriority);
  modalContent.appendChild(addTask);
  modalContent.appendChild(updateTask);

  taskPriority.appendChild(priorityOption);

  sidebar.appendChild(createProjectBox);
  sidebar.appendChild(displayProjectBox);
  createProjectBox.appendChild(addProject);
  createProjectBox.appendChild(projectBox);
  //displayProjectBox.appendChild(testProject);

  title.innerHTML = 'TODO-List';
  addProject.innerHTML = 'Add-Project';
  addTask.innerHTML = 'Add-Tasks';
  updateTask.innerHTML = 'Update';
  priorityOption.innerHTML = 'Choose --Project';
  popModule.innerHTML = '+';
  exitModule.innerHTML = 'X';

  function createOption() {
    for (let i = myProjects.length - 1; i < myProjects.length; i++) {
      const newOption = document.createElement('option');
      taskPriority.appendChild(newOption);
      newOption.setAttribute('id', 'newOption');
      newOption.innerHTML = myProjects[i].name;
    }
  }



  function clearContent(todoContent) {
    while (todoContent.firstChild) {
      todoContent.removeChild(todoContent.firstChild);
    }
  }


  const projectDivVal = [];
  function createTodoDivs2(e) {
    clearContent(todoContent);
    //let e = document.getElementById('select');
    const values = parseFloat(projectDivVal);
    for (let i = 0; i < myProjects[values].storage.length; i++) {
      const todoDivs = document.createElement('div');
      const edit = document.createElement('button');
      const delBtn = document.createElement('button');
      todoContent.setAttribute('value', i);
      myProjects[values].storage[i].dueDate = format(new Date(myProjects[values].storage[i].dueDate), 'MM/dd/yyyy');
      todoDivs.innerHTML = `<span>${myProjects[values].storage[i].title}</span>
    <span>${myProjects[values].storage[i].description}</span>
    <span>${myProjects[values].storage[i].dueDate}</span> <span>${myProjects[values].storage[i].project}</span>`;

      todoDivs.setAttribute('id', 'todoDiv');
      //todoDivs.setAttribute('data-book', i);
      todoContent.appendChild(todoDivs);
      todoDivs.appendChild(edit);
      todoDivs.appendChild(delBtn);
      edit.setAttribute('value', i);
      edit.textContent = 'Edit';
      delBtn.textContent = 'Delete';
      delBtn.setAttribute('value', i);
      // setAttr(edit);
      //setAttr(delBtn);
      //console.log(myProjects);
      edit.addEventListener('click', () => {
        modalContent.removeChild(modalContent.lastElementChild);
        modalContent.appendChild(updateTask);
        modal.style.display = 'block';
        editTodo(e);
        setAttr(edit);
        setAttr(delBtn);
        setAtr(todoDivs);
        // projectDivVal.pop();
      });

      delBtn.addEventListener('click', (e) => {
        projectDivVal.pop();
        projectDivVal.push(event.currentTarget.value);

        removeTodos(todoDivs);
      });
    }
  }

  function createTodoDivs(e) {
    projectDivVal.unshift(projectDivVal.pop());
    let value2 = parseFloat(projectDivVal);
    let value = parseFloat(event.currentTarget.value);
    if (value === '' || myProjects[value2].name !== document.getElementById('todoContent').children[0].children[3].childNodes[0].data) {
      value2 = value;
    }
    clearContent(todoContent);



    //let values2 = parseFloat(projectDivVal);
    projectDivVal.pop();
    // projectDivVal.push(values);
    //console.log(values); 
    for (let i = 0; i < myProjects[value2].storage.length; i++) {
      const todoDivs = document.createElement('div');
      const edit = document.createElement('button');
      const delBtn = document.createElement('button');
      todoDivs.setAttribute('id', 'todoDiv');
      //todoDivs.classList.add('todos');
      //todoContent.appendChild(todoDivs);
      //todoContent.setAttribute('value', i);
      todoContent.appendChild(todoDivs);
      myProjects[value2].storage[i].dueDate = format(new Date(myProjects[value2].storage[i].dueDate), 'MM/dd/yyyy');
      todoDivs.innerHTML = `<span>${myProjects[value2].storage[i].title}</span>
      <span>${myProjects[value2].storage[i].description}</span>
      <span>${myProjects[value2].storage[i].dueDate}</span> <span>${myProjects[value2].storage[i].project}</span>`;
      todoDivs.appendChild(edit);
      todoDivs.appendChild(delBtn);
      todoDivs.setAttribute('id', 'todoDiv');
      //todoDivs.setAttribute('data-book', i);
      edit.textContent = 'Edit';
      delBtn.textContent = 'Delete';
      setAttr(edit);
      setAttr(delBtn);
      //console.log(myProjects);
      edit.addEventListener('click', () => {
        modalContent.removeChild(modalContent.lastElementChild);
        modalContent.appendChild(updateTask);
        modal.style.display = 'block';
        editTodo(e);
        setAttr(edit);
        setAttr(delBtn);
        setAtr(todoDivs);

      });

      delBtn.addEventListener('click', (e) => {
        projectDivVal.pop();
        projectDivVal.push(event.currentTarget.value);
        for (let i = 0; i < myProjects.length;) {
          if (document.getElementById('displayProjectBox').children[i].children[0].childNodes[0].data !== document.getElementById('todoContent').children[0].children[3].childNodes[0].data) {
            i++
          } else {
            projectDivVal.push(document.getElementById('displayProjectBox').children[i].children[1].attributes[0].value);
            removeTodos(todoDivs);
            createTodoDivs();
            return false;
          }
        }
        //console.log(document.getElementById('todoContent').children[0].children[3].childNodes[0].data);
       // console.log(document.getElementById('displayProjectBox').children[0].children[1].attributes[0].value);

      });
     }
  }

  function clearSidebar(displayProjectBox) {
    while (displayProjectBox.firstChild) {
      displayProjectBox.removeChild(displayProjectBox.firstChild);
    }
  }

  //const projectVal = [];
  function createProjectDivs() {
    clearSidebar(displayProjectBox);
    
    /*if (myProjects.length === 1) {
      localStorage.removeItem('projectNames')
    }*/
    //const projectContainer = document.createElement('div');
    for (let i = 0; i < myProjects.length; i++) {
      
      const projectDiv = document.createElement('div');
      const projectDel = document.createElement('button');
      const projectShowTodos = document.createElement('button');

      content.appendChild(todoContent);
      displayProjectBox.appendChild(projectDiv);
      projectDiv.innerHTML = `<span>${myProjects[i].name}</span>`;
      projectDiv.setAttribute('id', 'projectDiv');
      const projectDivText = projectDiv.textContent;
     // projectShowTodos.classList.add('displays');
      setName2(projectShowTodos);
      // const userData = JSON.parse(localStorage.getItem('projectNames'));
      //console.log(userData[i].name);
      //projectDiv.innerHTML = `<span>${userData[i].name}</span>`;
      projectDiv.appendChild(projectDel);
      projectDel.textContent = 'Del';
      projectDiv.appendChild(projectShowTodos);
      projectDel.setAttribute('value', i);
      projectShowTodos.textContent = 'Display-Todos';
      projectShowTodos.setAttribute('value', i);
      projectShowTodos.setAttribute('id', 'show');
      projectDiv.setAttribute('name', i);
      //projectDiv.setAttribute('id', i);
      projectDiv.classList.add('projectDiv');
      //const projectDivs = document.querySelectorAll('.projectDiv');
      let value = document.getElementById('show').value;
      let values = parseFloat(value);
      projectDivVal.push(values);
      //projectDiv.style.backgroundColor = 'white';
     

      //console.log(values);
      /* projectDiv.addEventListener('click', (e) => {
         if (event.currentTarget.style.backgroundColor === '') {
         event.currentTarget.style.backgroundColor = 'blue';
        projectVal.unshift(projectVal.pop(event.currentTarget.id));
        projectDiv.style.backgroundColor = 'white';
         createTodoDivs();
         } else if(event.currentTarget.style.backgroundColor === 'blue') {
           event.currentTarget.style.backgroundColor = 'white';
           clearContent(todoContent);
         }
       })*/
      projectShowTodos.addEventListener('click', (e) => {
        //setName2(projectShowTodos);
        //projectDivVal.push(event.currentTarget.name);
        displayProjectTodos();
      });



      addProject.addEventListener('click', () => {
        if (document.getElementById('projectBox').value === '') {
          return false;
        }
        let name = document.getElementById('projectBox').value;
        const newProject = new Project(name);
        newProject.storeName();
        storeProjects();
        // storeProjects();
        //showProjects();
        createOption();
        createProjectDivs();
        newProject.showName();
        //submitClick(event)
        document.getElementById('projectBox').value = '';
      });

      function removeProject(projectDiv) {
        if (projectDiv.parentNode) {
          projectDiv.parentNode.removeChild(projectDiv);
          //newProject.removeName();
        }
      }

      projectDel.addEventListener('click', (e) => {
        const projectToPop = parseFloat(event.currentTarget.value);
        projectDivVal.push(projectToPop);
        const todoDivs = document.getElementById('todoDiv');
        if (todoDivs === null || document.getElementById('todoDiv').children.item(3).innerHTML === projectDivText) {
          clearContent(todoContent);
        }
        const selectOptions = document.getElementById('select');
        for (i = 0; i < selectOptions.length; i++) {
          if (selectOptions.options[i].textContent === projectDivText) {
            removeProject(projectDiv);
            selectOptions.remove(i);
            //console.log(myProjects);
            myProjects.splice([projectToPop], 1);
            storeProjects();
            //setName2(projectShowTodos);
            console.log(myProjects);
            i--;
            createProjectDivs();
          }
        }
      });
    }
  }
/// LOCAL STORAGE FUNCTIONS

  function showProjects() {
    const userData = JSON.parse(localStorage.getItem('projectNames'));
    // const projectDiv = document.getElementById('projectDiv');
    if (!userData) {
      return false;
    }
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].name === 'Default') {
        continue;
      }
      const newProject = new Project(userData[i].name);
      newProject.storeName();
    /*  const todoDivs = document.createElement('div');
    const edit = document.createElement('button');
    const delBtn = document.createElement('button');
    delBtn.classList.add('delBtn');
    edit.setAttribute('id', 'edit');
    edit.textContent = 'Edit';
    delBtn.innerHTML = 'Delete';
    todoDivs.setAttribute('id', 'todoDiv');
        todoDivs.classList.add('todos');
        todoContent.appendChild(todoDivs);
       // myTodos[0].dueDate = format(new Date(myTodos[0].dueDate), 'MM/dd/yyyy');
        todoDivs.innerHTML = `<span>${userData[i].storage[0].title}</span>
      <span>${userData[i].storage[0].description}</span>
      <span>${userData[i].storage[0].dueDate}</span> <span>${userData[i].storage[0].project}</span>`;
        todoDivs.appendChild(edit);
        todoDivs.appendChild(delBtn);*/
      const newOption = document.createElement('option');
      const projectDiv = document.createElement('div');
      const projectDel = document.createElement('button');
      const projectShowTodos = document.createElement('button');
      projectDiv.innerHTML = `<span>${userData[i].name}</span>`;
      displayProjectBox.appendChild(projectDiv);
      const projectDivText = projectDiv.textContent;
      projectDiv.setAttribute('id', 'projectDiv');
      projectDiv.appendChild(projectDel);
      projectDel.textContent = 'Del';
      projectDiv.appendChild(projectShowTodos);
      projectShowTodos.textContent = 'Display-Todos';
      projectShowTodos.setAttribute('value', i);
      projectDel.setAttribute('value', i);
      taskPriority.appendChild(newOption);
      newOption.setAttribute('id', 'newOption');
      newOption.innerHTML = userData[i].name;
      function removeProject(projectDiv) {
        if (projectDiv.parentNode) {
          projectDiv.parentNode.removeChild(projectDiv);
          //newProject.removeName();
        }
      }
      projectDel.addEventListener('click', (e) => {
        const projectToPop = parseFloat(event.currentTarget.value);
        projectDivVal.push(projectToPop);
        const todoDivs = document.getElementById('todoDiv');
        if (todoDivs === null || document.getElementById('todoDiv').children.item(3).innerHTML === projectDivText) {
          clearContent(todoContent);
        }
        const selectOptions = document.getElementById('select');
        for (i = 0; i < selectOptions.length; i++) {
          if (selectOptions.options[i].textContent === projectDivText) {
            removeProject(projectDiv);
            selectOptions.remove(i);
            //console.log(myProjects);
            myProjects.splice([projectToPop], 1);
            storeProjects();
            //setName2(projectShowTodos);
           // console.log(myProjects);
            i--;
            createProjectDivs();
          }
        }
      });

      projectShowTodos.addEventListener('click', (e) => {
        //setName2(projectShowTodos);
        //projectDivVal.push(event.currentTarget.name);
        displayProjectTodos();
      });
    }

  }

  function showTodos() {
    const userData = JSON.parse(localStorage.getItem('projectNames'));
    
    if (userData === null) {
      return false;
    }
    for (let i = 0; i < userData.length; i++) {
     
      if (userData[i].name !== myProjects[i].name) {
        continue;
      } else {
        for (let j = 0; j < userData[i].storage.length; j++) {
         if (todoContent.firstChild === null 
            || document.getElementById('todoDiv').children.item(3).innerHTML === userData[i].name) {
              myProjects[i].storage.push(userData[i].storage[j]);
              const todoDivs = document.createElement('div');
              const edit = document.createElement('button');
              const delBtn = document.createElement('button');
              delBtn.classList.add('delBtn');
              edit.setAttribute('id', 'edit');
              edit.setAttribute('value', j);
              delBtn.setAttribute('value', j);
              edit.textContent = 'Edit';
              delBtn.innerHTML = 'Delete';
              todoDivs.setAttribute('id', 'todoDiv');
              todoDivs.classList.add('todos');
                  todoContent.appendChild(todoDivs);
                todoDivs.innerHTML = `<span>${userData[i].storage[j].title}</span>
              <span>${userData[i].storage[j].description}</span>
              <span>${userData[i].storage[j].dueDate}</span> <span>${userData[i].storage[j].project}</span>`;
              todoDivs.appendChild(edit);
                  todoDivs.appendChild(delBtn);

               

                  edit.addEventListener('click', (e) => {
                    projectDivVal.pop();
                    projectDivVal.push(event.currentTarget.value);
                    modalContent.removeChild(modalContent.lastElementChild);
                    addTask.style.display = 'none';
                    updateTask.style.display = 'block';
                    modalContent.appendChild(updateTask);
                    modal.style.display = 'block';
                    editTodo(e);
                  });

                  delBtn.addEventListener('click', (e) => {
                    projectDivVal.pop();
                    projectDivVal.push(event.currentTarget.value);
                    for (let i = 0; i < myProjects.length;) {
                      if (document.getElementById('displayProjectBox').children[i].children[0].childNodes[0].data !== document.getElementById('todoContent').children[0].children[3].childNodes[0].data) {
                        i++
                      } else {
                        projectDivVal.push(document.getElementById('displayProjectBox').children[i].children[1].attributes[0].value);
                        removeTodos(todoDivs);
                        createTodoDivs();
                        return false;
                      }
                    }
                  });
              
          } else if (userData[i].name !== document.getElementById('todoDiv').children.item(3).innerHTML) {
            myProjects[i].storage.push(userData[i].storage[j]);
            continue;
          }

            
        }
        
      }
     
    }
  }


  function storeProjects() {
    //for (let i = 0; i < myProjects.length; i++) {
    localStorage.setItem('projectNames', JSON.stringify(myProjects));

    // }
  }

/// LOCAL STORAGE FUNCTIONS

  function displayProjectTodos(e) {
    clearContent(todoContent);
    let value = parseFloat(event.currentTarget.value);
    //let values2 = parseFloat(projectDivVal);
    projectDivVal.pop();
    // projectDivVal.push(values);
    //console.log(values); 
    for (let i = 0; i < myProjects[value].storage.length; i++) {
      const todoDivs = document.createElement('div');
      const edit = document.createElement('button');
      const delBtn = document.createElement('button');
      todoDivs.setAttribute('id', 'todoDiv');
      //todoDivs.classList.add('todos');
     //todoContent.appendChild(todoDivs);
      todoContent.setAttribute('value', i);
      todoContent.appendChild(todoDivs);
      myProjects[value].storage[i].dueDate = format(new Date(myProjects[value].storage[i].dueDate), 'MM/dd/yyyy');
      todoDivs.innerHTML = `<span>${myProjects[value].storage[i].title}</span>
        <span>${myProjects[value].storage[i].description}</span>
        <span>${myProjects[value].storage[i].dueDate}</span> <span>${myProjects[value].storage[i].project}</span>`;
      todoDivs.appendChild(edit);
      todoDivs.appendChild(delBtn);
      //todoDivs.setAttribute('id', 'todoDiv');
      //todoDivs.setAttribute('data-book', i);
      edit.textContent = 'Edit';
      delBtn.textContent = 'Delete';
      setAttr(edit);
      setAttr(delBtn);
      console.log(myProjects);
      edit.addEventListener('click', () => {
        projectDivVal.pop();
        projectDivVal.push(event.currentTarget.value);
        modalContent.removeChild(modalContent.lastElementChild);
        addTask.style.display = 'none';
        updateTask.style.display = 'block';
        modalContent.appendChild(updateTask);
        modal.style.display = 'block';
        editTodo();
      });

      delBtn.addEventListener('click', (e) => {
        projectDivVal.pop();
        projectDivVal.push(event.currentTarget.value);
        for (let i = 0; i < myProjects.length;) {
          if (document.getElementById('displayProjectBox').children[i].children[0].childNodes[0].data !== document.getElementById('todoContent').children[0].children[3].childNodes[0].data) {
            i++
          } else {
            projectDivVal.push(document.getElementById('displayProjectBox').children[i].children[1].attributes[0].value);
            removeTodos(todoDivs);
            createTodoDivs();
            return false;
          }
        }
        //console.log(document.getElementById('todoContent').children[0].children[3].childNodes[0].data);
        //console.log(document.getElementById('displayProjectBox').children[0].children[1].attributes[0].value);

      });
    }
  }

  window.addEventListener('load', () => {
   
    
    createOption();
    
    createProjectDivs();
    showProjects();
    showTodos();
  });

  const modal = document.getElementById('myModal');

  const btn = document.getElementById('popModule');

  btn.addEventListener('click', () => {
   // modalContent.removeChild(modalContent.lastElementChild);
   document.getElementById('taskTitle').value = '';
   document.getElementById('description').value = '';
   document.getElementById('taskDate').value = '';
    modalContent.appendChild(addTask);
    updateTask.style.display = 'none';
    addTask.style.display = 'block';
    modal.style.display = 'block';
  });

  exitModule.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  function removeTodos(todoDivs) {
    remove();
    if (todoDivs) {
      todoDivs.parentNode.removeChild(todoDivs);
      //createTodoDivs();
    }
  }

  function remove() {
    // projectDivVal.unshift(projectDivVal.pop());
    let value = event.currentTarget.value;
    let divVal = parseFloat(value);
    for (let i = 0; i < myProjects.length;) {
      if (document.getElementById('todoDiv').children.item(3).innerHTML !== myProjects[i].name) {
        i++
      } else {
        //const divVal = document.getElementById('todoDiv');
        // const text = divVal.getAttribute('value');
        // console.log(text);
        myProjects[i].storage.splice([divVal], 1);
        storeProjects();
        // projectDivVal.pop();
        //console.log(myProjects);
        return false;
      }
    }
  }

  function setAtr(todoDivs) {
    let element = document.getElementById('todoContent');
    let children = element.children;
    for (let i = 0; i < children.length; i++) {
      todoDivs.setAttribute('data-book', i);
    }
  }

  const myValues = [];
  function editTodo(e) {
    //setName(edit);
    let value = event.currentTarget.value;
    let values = parseFloat(value);
    //let value2 = parseFloat(projectDivVal);
    // let todoIndex = parseFloat(document.getElementById("todoContent").childNodes[values]);
    myValues.push(values);
    //const newTodo = new Todo(tdValue);
    //newTodo.storeData();
    //console.log(myTodos);
    for (let i = 0; i < myProjects.length;) {
      if (!myProjects[i] || myProjects[i].name !== document.getElementById('todoDiv').children.item(3).innerHTML) {
        i++
      } else {
        document.getElementById('taskTitle').value = myProjects[i].storage[values].title;
        document.getElementById('description').value = myProjects[i].storage[values].description;
        document.getElementById('taskDate').value = myProjects[i].storage[values].dueDate;
        document.getElementById('select').value = myProjects[i].storage[values].project;
        return false;
      }
    }
  }

  updateTask.addEventListener('click', () => {
    let e = document.getElementById('select');
    if (e.options[e.selectedIndex].text !== document.getElementById('todoDiv').children.item(3).innerHTML) {
      alert('wrong project selected');
      return false;
    } else {
      updateTodo();
    }
  })

  function updateTodo() {
    //myTodos.pop();
    //let colection = document.getElementById('todoContent').childNodes.length;
    let e = document.getElementById('select');
    if (document.getElementById('taskTitle').value === ''
      || document.getElementById('description').value === ''
      || document.getElementById('taskDate').value === ''
      || e.options[e.selectedIndex].text === 'Choose --Project') {
      return false;
    }
    //smodalContent.removeChild(modalContent.lastElementChild);
    modal.style.display = 'none';
    //let childValues = document.querySelectorAll('.todos');
   // console.log(childValues.childNodes);
    myValues.unshift(myValues.pop());
    let value = parseFloat(myValues);
    //let value2 = parseFloat(projectDivVal);
    //let todos = document.getElementById('todoContent').children;
    //console.log(todos);
    //console.log(todos[2].textContent);
    let title = document.getElementById('taskTitle').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('taskDate').value;
    let project = e.options[e.selectedIndex].text;
    const newTodo = new Todo(title, description, dueDate, project);
    newTodo.storeData();
    let todoDivs = document.createElement('div');
    const edit = document.createElement('button');
    const delBtn = document.createElement('button');
    edit.setAttribute('id', 'edit');
    edit.textContent = 'Edit';
    delBtn.innerHTML = 'Delete';
    /*edit.addEventListener('click', () => {
      modalContent.removeChild(modalContent.lastElementChild);
      modalContent.appendChild(updateTask);
      modal.style.display = 'block';*/
    edit.addEventListener('click', (e) => {
      projectDivVal.pop();
      projectDivVal.push(event.currentTarget.value);
      modalContent.removeChild(modalContent.lastElementChild);
      modalContent.appendChild(updateTask);
      modal.style.display = 'block';
      editTodo(e);
    });

    delBtn.addEventListener('click', (e) => {
      projectDivVal.pop();
      projectDivVal.push(event.currentTarget.value);
      for (let i = 0; i < myProjects.length;) {
        if (document.getElementById('displayProjectBox').children[i].children[0].childNodes[0].data !== document.getElementById('todoContent').children[0].children[3].childNodes[0].data) {
          i++
        } else {
          projectDivVal.push(document.getElementById('displayProjectBox').children[i].children[1].attributes[0].value);
          removeTodos(todoDivs);
          createTodoDivs();
          return false;
        }
      }
    });

    //delBtn.addEventListener('click', () => {
    //  removeTodos(todoDivs);
    // });
    for (let i = 0; i < myProjects.length;) {
      if (myTodos[0].project !== myProjects[i].name) {
        i++
      } else if (todoContent.firstChild === null
        || document.getElementById('todoDiv').children.item(3).innerHTML === e.options[e.selectedIndex].text) {
        //let value = parseFloat(projectDivVal);
        myProjects[i].storage.splice([value], 1, myTodos[0]);
        storeProjects();
        // const projectdivTexts = document.getElementById('projectDiv');
        //removeTodos(todoDivs);
        todoDivs.setAttribute('id', 'todoDiv');

        todoDivs = document.getElementById("todoContent").childNodes[value];
        myTodos[0].dueDate = format(new Date(myTodos[0].dueDate), 'MM/dd/yyyy');
        //todoContent.appendChild(todoDivs);
        todoDivs.innerHTML = `<span>${myTodos[0].title}</span>
       <span>${myTodos[0].description}</span>
       <span>${myTodos[0].dueDate}</span> <span>${myTodos[0].project}</span>`;
        todoDivs.appendChild(edit);
        todoDivs.appendChild(delBtn);
        // todoContent.appendChild(todoDivs);
        //todoDivs.appendChild(todoDiv);
        //edit.setAttribute('value', i);
        newTodo.deleteData();
        //console.log(myProjects[i].storage.length);
        document.getElementById('taskTitle').value = '';
        document.getElementById('description').value = '';
        document.getElementById('taskDate').value = '';
        edit.setAttribute('value', value);
        delBtn.setAttribute('value', value);
        //setAttr(edit);
        // setAttr(delBtn)
        //setAtr(todoDivs);
        myValues.pop();
        return false;
      } else {
        clearContent(todoContent);
        myProjects[i].storage.push(myTodos[0]);
        storeProjects();
        todoDivs.setAttribute('id', 'todoDiv');
        todoContent.appendChild(todoDivs);
        myTodos[0].dueDate = format(new Date(myTodos[0].dueDate), 'MM/dd/yyyy');
        todoDivs.innerHTML = `<span>${myTodos[0].title}</span>
       <span>${myTodos[0].description}</span>
       <span>${myTodos[0].dueDate}</span> <span>${myTodos[0].project}</span>`;
        todoDivs.appendChild(edit);
        //edit.setAttribute('value', i);
        newTodo.deleteData();
        console.log(myProjects[i].storage.length);
        document.getElementById('taskTitle').value = '';
        document.getElementById('description').value = '';
        document.getElementById('taskDate').value = '';
        setAttr(edit);
        setAttr(delBtn);
        setAtr(todoDivs);
        return false;
      }
    }
  }

  function displayTodos() {
    //console.log(myProjects)
    let e = document.getElementById('select');
    if (document.getElementById('taskTitle').value === ''
      || document.getElementById('description').value === ''
      || document.getElementById('taskDate').value === ''
      || e.options[e.selectedIndex].text === 'Choose --Project') {
      return false;
    }
    modal.style.display = 'none';
    let title = document.getElementById('taskTitle').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('taskDate').value;
    let project = e.options[e.selectedIndex].text;
    const newTodo = new Todo(title, description, dueDate, project);
    newTodo.storeData();
    //storeProjects();
    //formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });

    const todoDivs = document.createElement('div');
    const edit = document.createElement('button');
    const delBtn = document.createElement('button');
    delBtn.classList.add('delBtn');
    edit.setAttribute('id', 'edit');
    edit.textContent = 'Edit';
    delBtn.innerHTML = 'Delete';
    edit.addEventListener('click', () => {
      projectDivVal.pop();
      projectDivVal.push(event.currentTarget.value);
      modalContent.removeChild(modalContent.lastElementChild);
      addTask.style.display = 'none';
      updateTask.style.display = 'block';
      modalContent.appendChild(updateTask);
      modal.style.display = 'block';
    });

    delBtn.addEventListener('click', (e) => {
      projectDivVal.pop();
      projectDivVal.push(event.currentTarget.value);
      for (let i = 0; i < myProjects.length;) {
        if (document.getElementById('displayProjectBox').children[i].children[0].childNodes[0].data !== document.getElementById('todoContent').children[0].children[3].childNodes[0].data) {
          i++
        } else {
          projectDivVal.push(document.getElementById('displayProjectBox').children[i].children[1].attributes[0].value);
          removeTodos(todoDivs);
          createTodoDivs();
          return false;
        }
      }
     // console.log(document.getElementById('todoContent').children[0].children[3].childNodes[0].data);
    //  console.log(document.getElementById('displayProjectBox').children[0].children[1].attributes[0].value);

    });
    for (let i = 0; i < myProjects.length;) {
      if (myTodos[0].project !== myProjects[i].name) {
        i++
      } else if (todoContent.firstChild === null
        || document.getElementById('todoDiv').children.item(3).innerHTML === e.options[e.selectedIndex].text) {
        myProjects[i].storage.push(myTodos[0]);
        storeProjects();
        // const projectdivTexts = document.getElementById('projectDiv');
        todoDivs.setAttribute('id', 'todoDiv');
        //todoDivs.classList.add('todos');
        todoContent.appendChild(todoDivs);
        myTodos[0].dueDate = format(new Date(myTodos[0].dueDate), 'MM/dd/yyyy');
        todoDivs.innerHTML = `<span>${myTodos[0].title}</span>
      <span>${myTodos[0].description}</span>
      <span>${myTodos[0].dueDate}</span> <span>${myTodos[0].project}</span>`;
        todoDivs.appendChild(edit);
        todoDivs.appendChild(delBtn);
        //edit.setAttribute('value', i);
        newTodo.deleteData();
        //console.log(myProjects[i].storage.length);
        document.getElementById('taskTitle').value = '';
        document.getElementById('description').value = '';
        document.getElementById('taskDate').value = '';
        setAttr(edit);
        setAttr(delBtn)
        // setAttr2(todoDivs);
        //console.log(projectDivVal);
        return false;
      } else if (myProjects[i].storage.length > 0) {
        myProjects[i].storage.push(myTodos[0]);
        newTodo.deleteData();
        storeProjects();
        document.getElementById('taskTitle').value = '';
        document.getElementById('description').value = '';
        document.getElementById('taskDate').value = '';
        //let projectDivVal = [];
        projectDivVal.length = 0;
        projectDivVal.push(i);
        //console.log(projectDivVal);
        createTodoDivs2();
        return false;
      } else {
        clearContent(todoContent);
        myProjects[i].storage.push(myTodos[0]);
        storeProjects();
        todoDivs.setAttribute('id', 'todoDiv');
        todoContent.appendChild(todoDivs);
        myTodos[0].dueDate = format(new Date(myTodos[0].dueDate), 'MM/dd/yyyy')
        todoDivs.innerHTML = `<span>${myTodos[0].title}</span>
      <span>${myTodos[0].description}</span>
      <span>${myTodos[0].dueDate}</span> <span>${myTodos[0].project}</span>`;
        todoDivs.appendChild(edit);
        todoDivs.appendChild(delBtn);
        //edit.setAttribute('value', i);
        newTodo.deleteData();
        //console.log(myProjects[i].storage.length);
        document.getElementById('taskTitle').value = '';
        document.getElementById('description').value = '';
        document.getElementById('taskDate').value = '';
        setAttr(edit);
        setAttr(delBtn)
       // console.log(myProjects);
       // console.log(projectDivVal);
        return false;
      }
    }
  }


  addTask.addEventListener('click', () => {
    displayTodos();
  });

  function setAttr(edit) {
    let element = document.getElementById('todoContent');
    let children = element.children;
    for (let i = 0; i < children.length; i++) {
      edit.setAttribute('value', i);
    }
  }


  function setName2(projectShowTodos) {
    let element = document.getElementById('displayProjectBox');
    let children = element.children;
    for (let i = 0; i < children.length; i++) {
      projectShowTodos.setAttribute('name', i);
    }
  }



  /*function setAttr2(todoDivs) {
    let element = document.getElementById('todoContent');
    let children = element.children;
    for(let i = 0; i < children.length; i++) {
      todoDivs.setAttribute('value', i);
    }
  }*/

  function setAttr(delBtn) {
    let element = document.getElementById('todoContent');
    let children = element.children;
    for (let i = 0; i < children.length; i++) {
      delBtn.setAttribute('value', i);
    }
  }
  const newProject = new Project();
  const newTodo = new Todo();

  

  // testProject.innerHTML = 'Test Project';

  /* testProject.addEventListener('click', () => {
     newTodo.deleteData();
   });*/
  return container;
}

document.body.appendChild(component());

export default component;