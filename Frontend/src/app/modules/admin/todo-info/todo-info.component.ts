import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
  styleUrls: ['./todo-info.component.scss']
})
export class TodoInfoComponent implements OnInit {

  constructor() { }
  newTodo: string;
  editTodo: any;

  ngOnInit(): void {
  }

  todoAdd(todo: string){
    this.newTodo = todo;
  }

  todoUpdate(event: any){
    this.editTodo = event;
  }

}
