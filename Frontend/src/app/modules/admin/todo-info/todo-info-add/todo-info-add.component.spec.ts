import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInfoAddComponent } from './todo-info-add.component';

describe('TodoInfoAddComponent', () => {
  let component: TodoInfoAddComponent;
  let fixture: ComponentFixture<TodoInfoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoInfoAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoInfoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
