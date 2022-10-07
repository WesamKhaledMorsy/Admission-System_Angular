import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerCreateComponent } from './interviewer-create.component';

describe('InterviewerCreateComponent', () => {
  let component: InterviewerCreateComponent;
  let fixture: ComponentFixture<InterviewerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewerCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
