import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {TodoInfoComponent} from './todo-info.component';
import { TodoInfoListComponent } from './todo-info-list/todo-info-list.component';
import { TodoInfoAddComponent } from './todo-info-add/todo-info-add.component';
import { FormsModule } from '@angular/forms'; 

const Routes: Route[] = [
  {
      path     : '',
      component: TodoInfoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(Routes),
    CommonModule,
    FormsModule
  ],
  declarations: [
    TodoInfoComponent,
    TodoInfoListComponent,
    TodoInfoAddComponent
  ]
})
export class TodoInfoModule { }
