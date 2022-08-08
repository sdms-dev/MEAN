import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInfoListComponent } from './todo-info-list.component';

describe('TodoInfoListComponent', () => {
  let component: TodoInfoListComponent;
  let fixture: ComponentFixture<TodoInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoInfoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
