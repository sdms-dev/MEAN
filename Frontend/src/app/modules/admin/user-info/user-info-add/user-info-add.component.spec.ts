import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoAddComponent } from './user-info-add.component';

describe('UserInfoAddComponent', () => {
  let component: UserInfoAddComponent;
  let fixture: ComponentFixture<UserInfoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
