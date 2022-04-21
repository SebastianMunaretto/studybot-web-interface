import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTasksDialogComponent } from './delete-tasks-dialog.component';

describe('DeleteTasksDialogComponent', () => {
  let component: DeleteTasksDialogComponent;
  let fixture: ComponentFixture<DeleteTasksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTasksDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTasksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
