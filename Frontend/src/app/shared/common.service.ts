import { Injectable } from '@angular/core';
import * as Rx from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  editUser = new Rx.BehaviorSubject<any>(null);
  userDataChanged = new Rx.BehaviorSubject<any>(null);
  
}
