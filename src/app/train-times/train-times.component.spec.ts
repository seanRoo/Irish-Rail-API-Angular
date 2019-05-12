import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainTimesComponent } from './train-times.component';

describe('TrainTimesComponent', () => {
  let component: TrainTimesComponent;
  let fixture: ComponentFixture<TrainTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
