import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerDetailsComponent } from './interviewer-details.component';

describe('InterviewerDetailsComponent', () => {
  let component: InterviewerDetailsComponent;
  let fixture: ComponentFixture<InterviewerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
