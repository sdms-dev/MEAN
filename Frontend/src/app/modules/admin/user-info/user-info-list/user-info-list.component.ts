import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HttpService } from "../../../../shared/http-service.service";
import { User } from "./user-info.model";
import {CommonService} from '../../../../shared/common.service'

@Component({
  selector: "app-user-info-list",
  templateUrl: "./user-info-list.component.html",
  styleUrls: ["./user-info-list.component.scss"],
})
export class UserInfoListComponent implements OnInit {
  constructor(private httpService: HttpService, private commonService: CommonService) {}
  @Input() newUser!: string;
  @Output() userUpdate: EventEmitter<any> = new EventEmitter();

  userList: User[] = [];
  filterUserList: User[] = [];
  totalRows: number = 0;
  pageSize: number = 5;
  currentPage: number = 1;
  pageIndex: number = 1;
  sortType: string = 'firstname';
  filters: any = ['Admin', 'User', 'Guest', 'Client'];
  filterBy: string = '';

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnChanges(): void {
    this.commonService.userDataChanged.subscribe((data) => {
        if(data){
          this.getUsers();
        }
      });
  }

  changeFilter(e: any){
    
    this.filterBy = e.target.value;
    if(e.target.value){
      this.filterUserList = this.userList.filter((i)=>i.role.toLocaleLowerCase() == this.filterBy.toLocaleLowerCase());
    }else{
      this.filterUserList = this.userList;
    }
    
  }

  getUsers(): void {
    this.httpService
      .getData(`/user?page=${this.currentPage}&limit=${this.pageSize}`)
      .subscribe((response) => {
        this.userList = response?.["data"] ? response["data"] : [];
        this.filterUserList = response?.["data"] ? response["data"] : [];
        this.totalRows = response?.["count"];
      });
  }

  deleteUser(val: any, i: number): void {
    const newArr = [...this.userList];
    newArr.splice(i, 1);
    this.userList = newArr;
    this.filterUserList = newArr;
    this.httpService.deleteData(`/user/${val._id}`).subscribe((response) => {});
  }

  editUser(val: any): void {
    this.commonService.editUser.next(val);
  }

  previous() {
    this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
    if (this.currentPage >= 0) {
      this.getUsers();
    }
  }

  next() {
    this.currentPage = this.currentPage >= 1 ? this.currentPage + 1 : 1;
    this.getUsers();
  }

  sort(value: string){
    this.sortType = value;
    let arr = this.userList.sort(function(a, b) {
      var x = a[value].toLocaleLowerCase(); var y = b[value].toLocaleLowerCase();
      return ((x <= y) ? -1 : ((x >= y) ? 1 : 0));
    });
    this.filterUserList = arr;
    this.userList = arr;
  }
}
