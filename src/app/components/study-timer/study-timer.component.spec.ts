import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTimerComponent } from './study-timer.component';

describe('StudyTimerComponent', () => {
  let component: StudyTimerComponent;
  let fixture: ComponentFixture<StudyTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
