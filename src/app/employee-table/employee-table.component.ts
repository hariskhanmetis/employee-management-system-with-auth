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
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent {
  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  employees: Employee[] = [];
  displayedColumns: string[] = ['id', 'name', 'age', 'category', 'actions'];
  dataSource = new MatTableDataSource<Employee>(this.employees);

  @ViewChild(MatPaginator) paginator!: MatPaginator;;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
          this.snackBar.open('User added successfully!', 'Close', { duration: 3000 });
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
          this.snackBar.open('User updated successfully!', 'Close', { duration: 3000 });
          console.log("Employee updated successfully!");
        });
      }
    });
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadUsers();
          this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          this.snackBar.open('Error deleting user. Please try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '270px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Logout", result);
        console.log('Logout dialog closed, proceeding with logout');
        this.snackBar.open('Logout Successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/login']);
      }
      else {
        console.log('Logout cancelled');
      }
    });
  }

  onLogout() {
    this.openDialog('250ms', '250ms');
  }

}
