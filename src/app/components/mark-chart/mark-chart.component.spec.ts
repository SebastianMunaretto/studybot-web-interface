import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkChartComponent } from './mark-chart.component';

describe('MarkChartComponent', () => {
  let component: MarkChartComponent;
  let fixture: ComponentFixture<MarkChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
