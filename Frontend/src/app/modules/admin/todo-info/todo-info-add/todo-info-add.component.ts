import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import {NgForm} from '@angular/forms'
import {HttpService} from '../../../../shared/http-service.service';

@Component({
  selector: 'app-todo-info-add',
  templateUrl: './todo-info-add.component.html',
  styleUrls: ['./todo-info-add.component.scss']
})
export class TodoInfoAddComponent implements OnInit {

  @ViewChild('todoForm') todoForm : NgForm;
  @Output() todoAdd : EventEmitter<any> = new EventEmitter();
  @Input() editTodo: any;

  constructor(private httpService: HttpService) { }

  isEditing: boolean = false;

  ngOnInit(): void {
  }

  ngOnChanges(): void{
    if(this.editTodo){
      this.isEditing = true;
      this.todoForm?.setValue({todo: this.editTodo.name});
    }
  }

  onSubmit(event: any){
    event.preventDefault();
    this.todoAdd.emit(this.todoForm?.value.todo);
    this.addTodo();
  }

  addTodo(): void {    
    if(!this.todoForm?.value.todo) return;
    if (this.isEditing) {
      let payload = {
        _id: this.editTodo._id,
        name: this.todoForm?.value.todo,
        description: '',
        field1: '',
        field2: ''
      }
      this.httpService
        .putData(`/demo/${this.editTodo._id}`, payload)
        .subscribe((response) => {
          this.todoForm?.reset();
        });
      this.isEditing = false;
    } else {
      let payload = {
        name: this.todoForm?.value.todo,
        description: ' ',
        field1: ' ',
        field2: ' '
      }
      this.httpService
        .postData("/demo/", payload)
        .subscribe((response) => {
          this.todoForm?.reset()
        });
    }
  }
}
