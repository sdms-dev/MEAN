import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor() { }

  newUser: string;
  editUser: any;

  ngOnInit(): void {
  }

  userAdd(user: string){
    this.newUser = user;
  }

  userUpdate(event: any){
    this.editUser = event;
  }

}
