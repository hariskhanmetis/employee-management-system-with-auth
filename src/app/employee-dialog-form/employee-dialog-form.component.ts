import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from '../models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-dialog-form',
  templateUrl: './employee-dialog-form.component.html',
  styleUrls: ['./employee-dialog-form.component.css']
})
export class EmployeeDialogFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  formDirty = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) { }

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Za-z\s]+$/)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      category: ['', [Validators.required]]
    });

    if (this.isEditMode) {
      console.log("Editing Employee:", this.data);
      this.employeeForm.patchValue(this.data);
    } else {
      console.log("Adding New Employee...");
    }

    this.employeeForm.valueChanges.subscribe(() => {
      this.formDirty = true;
    });
  }

  closeDialog() {
    if (this.formDirty) {
      const confirm = window.confirm('Are you sure you want to discard the changes?');
      if (!confirm) {
        return;
      }
      this.dialogRef.close();
    }
  }

  saveEmployee() {
    const employeeData = this.employeeForm.value;
    if (!this.isEditMode) {
      employeeData.id = this.generateRandomId();
      employeeData.id = employeeData.id.toString();
    } else {
      employeeData.id = this.data.id;
    }
    this.formDirty = false;
    this.dialogRef.close(employeeData);
  }

  private generateRandomId(): number {
    return Math.floor(1000 + Math.random() * 9999);
  }
}
