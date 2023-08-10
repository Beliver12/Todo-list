import './style.css';
import './sidebar.css';
import './content.css';
import { format, compareAsc } from 'date-fns';
import { Project, myProjects } from './project';
import { Todo, myTodos } from './todos';

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
  //attributes ====>
  sidebar.setAttribute('id', 'sidebar');
  createProjectBox.setAttribute('id', 'createProjectBox');
  addProject.setAttribute('id', 'addProject');
  projectBox.setAttribute('id', 'projectBox');
  projectBox.setAttribute('required', 'true');
  displayProjectBox.setAttribute('id', 'displayProjectBox');
  //<==== attributes
  //<==== sidebar DOM

  //content DOM ====>
  const content = document.createElement('div');
  const todoContent = document.createElement('div');
  todoContent.setAttribute('id', 'todoContent');
  const createModal = document.createElement('div');
  const modalContent = document.createElement('div');
  const popModule = document.createElement('button');
  const tabs = document.createElement('div');
  const titleTab = document.createElement('span');
  const descriptionTab = document.createElement('span');
  const dateTab = document.createElement('span');
  const projectTab = document.createElement('span');
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
  tabs.setAttribute('id', 'tabs');
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
  content.appendChild(tabs);
  content.appendChild(createModal);

  tabs.appendChild(titleTab);
  tabs.appendChild(descriptionTab);
  tabs.appendChild(dateTab);
  tabs.appendChild(projectTab);

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

  titleTab.innerHTML = 'TITLE';
  descriptionTab.innerHTML = 'DESCRIPTION';
  dateTab.innerHTML = 'DATE';
  projectTab.innerHTML = 'PROJECT';

  title.innerHTML = 'TODO-List';
  addProject.innerHTML = 'Add-Project';
  addTask.innerHTML = 'Add-Tasks';
  updateTask.innerHTML = 'Update';
  priorityOption.innerHTML = 'Choose --Project';
  popModule.innerHTML = 'Create-Task';
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
      todoContent.appendChild(todoDivs);
      todoDivs.appendChild(edit);
      todoDivs.appendChild(delBtn);
      edit.setAttribute('value', i);
      edit.textContent = 'Edit';
      delBtn.textContent = 'Delete';
      delBtn.setAttribute('value', i);
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

    projectDivVal.pop();
    for (let i = 0; i < myProjects[value2].storage.length; i++) {
      const todoDivs = document.createElement('div');
      const edit = document.createElement('button');
      const delBtn = document.createElement('button');
      todoDivs.setAttribute('id', 'todoDiv');
      todoContent.appendChild(todoDivs);
      myProjects[value2].storage[i].dueDate = format(new Date(myProjects[value2].storage[i].dueDate), 'MM/dd/yyyy');
      todoDivs.innerHTML = `<span>${myProjects[value2].storage[i].title}</span>
      <span>${myProjects[value2].storage[i].description}</span>
      <span>${myProjects[value2].storage[i].dueDate}</span> <span>${myProjects[value2].storage[i].project}</span>`;
      todoDivs.appendChild(edit);
      todoDivs.appendChild(delBtn);
      todoDivs.setAttribute('id', 'todoDiv');
      edit.textContent = 'Edit';
      delBtn.textContent = 'Delete';
      setAttr(edit);
      setAttr(delBtn);
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
      });
    }
  }

  function clearSidebar(displayProjectBox) {
    while (displayProjectBox.firstChild) {
      displayProjectBox.removeChild(displayProjectBox.firstChild);
    }
  }

  function createProjectDivs() {
    clearSidebar(displayProjectBox);
    for (let i = 0; i < myProjects.length; i++) {
      activeProject()
      const projectDiv = document.createElement('div');
      const projectDel = document.createElement('button');
      const projectShowTodos = document.createElement('button');
      content.appendChild(todoContent);
      displayProjectBox.appendChild(projectDiv);
      projectDiv.innerHTML = `<span>${myProjects[i].name}</span>`;
      projectDiv.setAttribute('id', 'projectDiv');
      const projectDivText = projectDiv.textContent;
      setName2(projectShowTodos);
      projectDiv.appendChild(projectDel);
      projectDel.textContent = 'Del';
      projectDiv.appendChild(projectShowTodos);
      projectDel.setAttribute('value', i);
      projectShowTodos.textContent = 'Display-Todos';
      projectShowTodos.setAttribute('value', i);
      projectShowTodos.setAttribute('id', 'show');
      projectDiv.setAttribute('name', i);
      projectDiv.classList.add('projectDiv');
      let value = document.getElementById('show').value;
      let values = parseFloat(value);
      projectDivVal.push(values);
      projectShowTodos.addEventListener('click', (e) => {
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
        createOption();
        createProjectDivs();
        newProject.showName();
        document.getElementById('projectBox').value = '';
      });
      function removeProject(projectDiv) {
        if (projectDiv.parentNode) {
          projectDiv.parentNode.removeChild(projectDiv);
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
            myProjects.splice([projectToPop], 1);
            storeProjects();
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
    if (!userData) {
      return false;
    }
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].name === 'Default') {
        continue;
      }
      const newProject = new Project(userData[i].name);
      newProject.storeName();
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
            myProjects.splice([projectToPop], 1);
            storeProjects();
            i--;
            createProjectDivs();
          }
        }
      });

      projectShowTodos.addEventListener('click', (e) => {
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
            userData[i].storage[j].dueDate = format(new Date(userData[i].storage[j].dueDate), 'MM/dd/yyyy');
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
    localStorage.setItem('projectNames', JSON.stringify(myProjects));
  }

  /// LOCAL STORAGE FUNCTIONS
  function displayProjectTodos(e) {
    clearContent(todoContent);
    let value = parseFloat(event.currentTarget.value);
    projectDivVal.pop();
    if (myProjects[value].storage.length === 0) {
      activeProject()
    }
    for (let i = 0; i < myProjects[value].storage.length; i++) {
      
      const todoDivs = document.createElement('div');
      const edit = document.createElement('button');
      const delBtn = document.createElement('button');
      todoDivs.setAttribute('id', 'todoDiv');
      todoContent.setAttribute('value', i);
      todoContent.appendChild(todoDivs);
      myProjects[value].storage[i].dueDate = format(new Date(myProjects[value].storage[i].dueDate), 'MM/dd/yyyy');
      todoDivs.innerHTML = `<span>${myProjects[value].storage[i].title}</span>
        <span>${myProjects[value].storage[i].description}</span>
        <span>${myProjects[value].storage[i].dueDate}</span> <span>${myProjects[value].storage[i].project}</span>`;
      todoDivs.appendChild(edit);
      todoDivs.appendChild(delBtn);
      edit.textContent = 'Edit';
      delBtn.textContent = 'Delete';
      setAttr(edit);
      setAttr(delBtn);
      activeProject()
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
      });
    }
  }

  window.addEventListener('load', () => {
    createOption();
    createProjectDivs();
    showProjects();
    showTodos();
    activeProject()
  });

  const modal = document.getElementById('myModal');

  const btn = document.getElementById('popModule');

  btn.addEventListener('click', () => {
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
    let value = event.currentTarget.value;
    let values = parseFloat(value);
    myValues.push(values);
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
    let e = document.getElementById('select');
    if (document.getElementById('taskTitle').value === ''
      || document.getElementById('description').value === ''
      || document.getElementById('taskDate').value === ''
      || e.options[e.selectedIndex].text === 'Choose --Project') {
      return false;
    }
    modal.style.display = 'none';
    myValues.unshift(myValues.pop());
    let value = parseFloat(myValues);
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

    for (let i = 0; i < myProjects.length;) {
      if (myTodos[0].project !== myProjects[i].name) {
        i++
      } else if (todoContent.firstChild === null
        || document.getElementById('todoDiv').children.item(3).innerHTML === e.options[e.selectedIndex].text) {
        myProjects[i].storage.splice([value], 1, myTodos[0]);
        storeProjects();
        todoDivs.setAttribute('id', 'todoDiv');
        todoDivs = document.getElementById("todoContent").childNodes[value];
        myTodos[0].dueDate = format(new Date(myTodos[0].dueDate), 'MM/dd/yyyy');
        todoDivs.innerHTML = `<span>${myTodos[0].title}</span>
       <span>${myTodos[0].description}</span>
       <span>${myTodos[0].dueDate}</span> <span>${myTodos[0].project}</span>`;
        todoDivs.appendChild(edit);
        todoDivs.appendChild(delBtn);
        newTodo.deleteData();
        document.getElementById('taskTitle').value = '';
        document.getElementById('description').value = '';
        document.getElementById('taskDate').value = '';
        edit.setAttribute('value', value);
        delBtn.setAttribute('value', value);
        myValues.pop();
        activeProject()
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
        newTodo.deleteData();
        console.log(myProjects[i].storage.length);
        document.getElementById('taskTitle').value = '';
        document.getElementById('description').value = '';
        document.getElementById('taskDate').value = '';
        setAttr(edit);
        setAttr(delBtn);
        setAtr(todoDivs);
        activeProject()
        return false;
      }
    }
  }

  function displayTodos() {
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
          activeProject()
          return false;
        }
      }
    });
    for (let i = 0; i < myProjects.length;) {
      if (myTodos[0].project !== myProjects[i].name) {
        i++
      } else if (todoContent.firstChild === null
        || document.getElementById('todoDiv').children.item(3).innerHTML === e.options[e.selectedIndex].text) {
        myProjects[i].storage.push(myTodos[0]);
        storeProjects();
        todoDivs.setAttribute('id', 'todoDiv');
        todoContent.appendChild(todoDivs);
        myTodos[0].dueDate = format(new Date(myTodos[0].dueDate), 'MM/dd/yyyy');
        todoDivs.innerHTML = `<span>${myTodos[0].title}</span>
      <span>${myTodos[0].description}</span>
      <span>${myTodos[0].dueDate}</span> <span>${myTodos[0].project}</span>`;
        todoDivs.appendChild(edit);
        todoDivs.appendChild(delBtn);
        newTodo.deleteData();
        document.getElementById('taskTitle').value = '';
        document.getElementById('description').value = '';
        document.getElementById('taskDate').value = '';
        setAttr(edit);
        setAttr(delBtn);
        activeProject()
        return false;
      } else if (myProjects[i].storage.length > 0) {
        myProjects[i].storage.push(myTodos[0]);
        newTodo.deleteData();
        storeProjects();
        document.getElementById('taskTitle').value = '';
        document.getElementById('description').value = '';
        document.getElementById('taskDate').value = '';
        projectDivVal.length = 0;
        projectDivVal.push(i);
        createTodoDivs2();
        activeProject()
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
        newTodo.deleteData();
        document.getElementById('taskTitle').value = '';
        document.getElementById('description').value = '';
        document.getElementById('taskDate').value = '';
        setAttr(edit);
        setAttr(delBtn);
        activeProject();
        return false;
      }
    }
  }
  
  function activeProject() {
   const childrens = document.getElementById('displayProjectBox').childNodes;
    for (let i = 0; i < childrens.length; i++)
    if (document.getElementById('todoDiv') === null ) {
      childrens[i].style.backgroundColor = 'transparent';
      childrens[i].style.border = '1px solid white'
    } else if (document.getElementById('todoDiv').children.item(3).innerHTML === childrens[i].children.item(0).innerHTML) {
      childrens[i].style.backgroundColor = 'green';
  childrens[i].style.border = '2px solid black';
    } else if(document.getElementById('todoDiv').children.item(3).innerHTML !== childrens[i].children.item(0).innerHTML) {
      childrens[i].style.backgroundColor = 'transparent';
      childrens[i].style.border = '1px solid white'
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

  function setAttr(delBtn) {
    let element = document.getElementById('todoContent');
    let children = element.children;
    for (let i = 0; i < children.length; i++) {
      delBtn.setAttribute('value', i);
    }
  }
  const newProject = new Project();
  const newTodo = new Todo();

  return container;
}

document.body.appendChild(component());



export default component;