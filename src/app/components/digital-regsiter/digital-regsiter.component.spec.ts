import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalRegsiterComponent } from './digital-regsiter.component';

describe('DigitalRegsiterComponent', () => {
  let component: DigitalRegsiterComponent;
  let fixture: ComponentFixture<DigitalRegsiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalRegsiterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalRegsiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
