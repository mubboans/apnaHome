import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinecardComponent } from './timelinecard.component';

describe('TimelinecardComponent', () => {
  let component: TimelinecardComponent;
  let fixture: ComponentFixture<TimelinecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
