import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDialogueComponent } from './job-dialogue.component';

describe('JobDialogueComponent', () => {
  let component: JobDialogueComponent;
  let fixture: ComponentFixture<JobDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobDialogueComponent]
    });
    fixture = TestBed.createComponent(JobDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
