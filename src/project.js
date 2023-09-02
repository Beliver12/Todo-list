import { myTodos } from './todos';

export const myProjects = [{ name: 'Default', storage: [] }];
export class Project {
  constructor(name, storage) {
    this.name = name;
    this.storage = storage;
  }

  storeName() {
    const storage = [];
    const { name } = this;
    myProjects.push({ name, storage });
  }

  showName() {
    console.log(myProjects);
  }

  removeName() {
    myProjects.pop(this.name, this.storage);
    console.log(myProjects);
  }

  /* storeTodo() {
     for (let i = myProjects.length -1; i < myProjects.length; i++) {

     }
   } */
}
