import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDialogFormComponent } from './employee-dialog-form.component';

describe('EmployeeDialogFormComponent', () => {
  let component: EmployeeDialogFormComponent;
  let fixture: ComponentFixture<EmployeeDialogFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeDialogFormComponent]
    });
    fixture = TestBed.createComponent(EmployeeDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
