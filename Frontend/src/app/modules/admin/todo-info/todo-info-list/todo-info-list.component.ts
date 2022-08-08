import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { HttpService } from "../../../../shared/http-service.service";
import { Todo } from "./todo-info-list.model";

@Component({
  selector: "app-todo-info-list",
  templateUrl: "./todo-info-list.component.html",
  styleUrls: ["./todo-info-list.component.scss"],
})
export class TodoInfoListComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  @Input() newTodo!: string;
  @Output() todoUpdate: EventEmitter<any> = new EventEmitter();

  todoList: Todo[] = [];
  totalRows: number = 0;
  pageSize: number = 5;
  currentPage: number = 1;
  pageIndex: number = 1;

  ngOnInit(): void {
    this.getTodos();
  }

  ngOnChanges(): void {
    if (this.newTodo) {
      this.todoList.push({ _id: null, name: this.newTodo });
      this.getTodos();
    }
  }

  getTodos(): void {
    this.httpService
      .getData(`/demo?page=${this.currentPage}&limit=${this.pageSize}`)
      .subscribe((response) => {
        this.todoList = response?.["data"] ? response["data"] : [];
        this.totalRows = response?.["count"];
      });
  }

  deleteTodo(val: any, i: number): void {
    const newArr = [...this.todoList];
    newArr.splice(i, 1);
    this.todoList = newArr;
    this.httpService.deleteData(`/demo/${val._id}`).subscribe((response) => {});
  }

  editTodo(val: any): void {
    this.todoUpdate.emit(val);
  }

  previous() {
    this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
    if (this.currentPage >= 0) {
      this.getTodos();
    }
  }

  next() {
    this.currentPage = this.currentPage >= 1 ? this.currentPage + 1 : 1;
    this.getTodos();
  }
}
