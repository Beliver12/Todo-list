import { myProjects } from './project';

export const myTodos = [];
export class Todo {
  constructor(title, description, dueDate, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.project = project;
  }
  storeData() {
    let title = this.title;
    let description = this.description;
    let dueDate = this.dueDate;
    let project = this.project;
    let tdValue = this.tdValue;
    myTodos.push({ title, description, dueDate, project })
  }
  deleteData() {
    for (let i = 3; i >= myTodos.length; i--) {
    myTodos.pop();
    }
  }
}


