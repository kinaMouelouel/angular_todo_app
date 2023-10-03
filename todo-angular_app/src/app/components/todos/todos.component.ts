import { Component, OnInit } from '@angular/core';

import { Todo } from '../../models/Todo'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class todosComponent implements OnInit {
  updateIndex = 0
  buttonText = 'Add Task'
  todos: Todo[] = [];
  inputTodo: string = "";
  constructor() {

  }
  ngOnInit(): void {
    this.todos = [{ id: 1, content: 'First todo task', completed: false }, { id: 2, content: 'Second todo task', completed: true }]
  }
  //toggle a task
  toggleDone(id: number) {
    this.todos.map((item, index) => {
      if (id == item.id) {
        item.completed = !item.completed;
      }
      return item;
    })

  }

  //delete a task
  deleteTask(id: number) {
    this.todos = [...this.todos].filter((item, index) => id != item.id);
  }
  //edit a task 
  editTask(id: number) {

    let editTask: Todo | undefined = [...this.todos].find((item) => id == item.id);
    this.buttonText = 'Update'
    this.updateIndex = id
    this.inputTodo = editTask != undefined ? editTask.content ?? '' : '';
  }
  addTodo() {
    //add new todo to the list and clear out the textbox after adding it
    //new task 
    if (this.updateIndex == 0) {
      let maxIndex = this.todos.reduce((prev, current) => (prev && prev.id > current.id) ? prev : current)
      this.todos.push({
        id: maxIndex.id + 1,
        content: this.inputTodo,
        completed: false,
      })

    } else {
      //updated task 
      this.todos.map((item, index) => {
        if (this.updateIndex == item.id) {
          item.content = this.inputTodo;
        }
        return item;
      })
    }
    this.inputTodo = "";
    this.updateIndex = 0
    this.buttonText = 'Add Task'


  }


}
