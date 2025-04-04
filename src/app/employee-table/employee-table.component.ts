import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeDialogFormComponent } from '../employee-dialog-form/employee-dialog-form.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['id', 'name', 'age', 'category', 'actions'];
  dataSource = new MatTableDataSource<Employee>(this.employees);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
  }

  loadUsers() {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
      this.dataSource.data = this.employees;
    });
  }

  addEmployee() {
    const dialogRef = this.dialog.open(EmployeeDialogFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.addEmployee(result).subscribe(() => {
          this.loadUsers();
          this.snackBar.open('User added successfully!', 'Close', { duration: 3000, horizontalPosition: 'left', verticalPosition: 'bottom' });
          this.notificationService.addNotification(`✅ New Employee "${result.name}" has been added!`);
          console.log("User added successfully!");
        });
      }
    });
  }

  editEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeDialogFormComponent, {
      data: employee
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.updateEmployee(result).subscribe(() => {
          this.loadUsers();
          this.snackBar.open('User updated successfully!', 'Close', { duration: 3000, horizontalPosition: 'left', verticalPosition: 'bottom' });
          this.notificationService.addNotification(`✏️ Employee "${result.name}" has been updated!`);
          console.log("Employee updated successfully!");
        });
      }
    });
  }

  deleteEmployee(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            this.loadUsers();
            this.snackBar.open('User deleted successfully', 'Close', { duration: 3000, horizontalPosition: 'left', verticalPosition: 'bottom' });
            this.notificationService.addNotification(`🗑️ Employee with ID: ${id} has been deleted!`);

          },
          error: (error) => {
            console.error('Error deleting employee:', error);
            this.snackBar.open('Error deleting user. Please try again.', 'Close', { duration: 3000, horizontalPosition: 'left', verticalPosition: 'bottom' });
          }
        });
      }
    });
  }
}