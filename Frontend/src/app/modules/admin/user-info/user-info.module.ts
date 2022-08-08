import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {UserInfoComponent} from './user-info.component';
import { UserInfoListComponent } from './user-info-list/user-info-list.component';
import { UserInfoAddComponent, NgbdModalComponent } from './user-info-add/user-info-add.component';
import { FormsModule } from '@angular/forms'; 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const Routes: Route[] = [
  {
      path     : '',
      component: UserInfoComponent
  }
];

@NgModule({
  imports: [
    NgbModule,
    RouterModule.forChild(Routes),
    CommonModule,
    FormsModule,
  ],
  declarations: [
    UserInfoComponent,
    UserInfoListComponent,
    UserInfoAddComponent,
    NgbdModalComponent
  ],
  exports:[
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [UserInfoAddComponent],
})

export class UserInfoModule { }
