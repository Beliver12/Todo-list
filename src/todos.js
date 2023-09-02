import { myProjects } from "./project";

export const myTodos = [];
export class Todo {
  constructor(title, description, dueDate, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.project = project;
  }

  storeData() {
    const { title } = this;
    const { description } = this;
    const { dueDate } = this;
    const { project } = this;
    const { tdValue } = this;
    myTodos.push({
      title,
      description,
      dueDate,
      project,
    });
  }

  deleteData() {
    for (let i = 3; i >= myTodos.length; i--) {
      myTodos.pop();
    }
  }
}
