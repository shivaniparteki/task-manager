// CRUD
import Task from "./task.js";

export const taskOperations = {
  tasks: [],
  getAllTask() {
    return this.tasks;
  },

  add(id, name, desc, date, url) {
    const task = new Task(id, name, desc, date, url);
    this.tasks.push(task);
    console.log("Added", this.tasks);
    return task;
  },
  deleteMarked() {
    this.tasks = this.tasks.filter((task) => !task.isMarked);
    return this.tasks;
  },
  mark(id) {
    let task = this.tasks.find((task) => task.id == id);
    if (task) {
      task.toggle();
    }
    // for (let i = 0; i < this.tasks.length; i++) {
    //   if (this.tasks[i].id == id) {
    //     let taskObject = this.tasks[i];
    //     taskObject.isMarked = !taskObject.isMarked;
    //   }
    // }
  },
  countMarked() {
    return this.tasks.filter((task) => task.isMarked).length;
    // let count = 0;
    // for (let i = 0; i < this.tasks.length; i++) {
    //   if (this.tasks[i].isMarked) {
    //     count++;
    //   }
    // }
    // return count;
  },
  countUnmarked() {
    return this.tasks.length - this.countMarked();
  },
};
