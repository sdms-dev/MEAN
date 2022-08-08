import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpService } from "../../../../shared/http-service.service";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonService } from "../../../../shared/common.service";

let modalReference = null;

@Component({
  selector: "app-user-info-add",
  templateUrl: "./user-info-add.component.html",
  styleUrls: ["./user-info-add.component.scss"],
  providers: [NgbActiveModal],
})
export class UserInfoAddComponent implements OnInit {
  @ViewChild("userForm") userForm: NgForm;

  formModal: any;

  constructor(
    private httpService: HttpService,
    public activeModal: NgbActiveModal,
    private commonService: CommonService
  ) {}

  isEditing: boolean = false;

  ngOnInit(): void {
    this.commonService.editUser.subscribe((data) => {
      setTimeout(() => {
        if (data) {
          this.isEditing = true;
          this.userForm?.reset();
          this.userForm?.setValue({
            _id: data["_id"],
            firstname: data["firstname"],
            lastname: data["lastname"],
            username: data["username"],
            role: data["role"],
            email: data["email"],
          });
        }
      }, 0);
    });
  }

  closeModal() {
    modalReference.close();
  }

  ngOnChanges(): void {
    this.commonService.editUser.subscribe((data) => {
      if (data) {
        this.isEditing = true;
        this.userForm?.reset();
        this.userForm?.setValue({
          _id: data["_id"],
          firstname: data["firstname"],
          lastname: data["lastname"],
          username: data["username"],
          role: data["role"],
          email: data["email"],
        });
      }
    });
  }

  onSubmit(event: any) {
    event.preventDefault();
    this.addUser();
  }

  addUser(): void {
    if (!this.userForm?.value.firstname) return;
    if (this.isEditing) {
      this.httpService
        .putData(`/user/${this.userForm?.value._id}`, {
          ...this.userForm?.value,
        })
        .subscribe((response) => {
          this.commonService.userDataChanged.next(true);
          this.commonService.editUser.next(null);
          this.userForm?.reset();
          this.closeModal();
        });
      this.isEditing = false;
    } else {
      this.httpService
        .postData("/user", (({ _id, ...o }) => o)(this.userForm?.value))
        .subscribe((response) => {
          this.commonService.userDataChanged.next(true);
          this.userForm?.reset();
          this.closeModal();
        });
    }
  }
}

@Component({
  selector: "ngbd-modal-component",
  template: ` <button type="button" (click)="newUser()" class="btn btn-primary">
    Add New User
  </button>`,
})
export class NgbdModalComponent {
  constructor(
    private modalService: NgbModal,
    private commonService: CommonService
  ) {
    this.commonService.editUser.subscribe((data) => {
      if (data) {
        this.openModal();
      }
    });
  }

  newUser() {
    this.commonService.editUser.next(null);
    this.openModal();
  }
  openModal() {
    if (modalReference) {
      this.closeModal();
    }
    modalReference = this.modalService.open(UserInfoAddComponent);
  }
  closeModal() {
    modalReference.close();
  }
}
