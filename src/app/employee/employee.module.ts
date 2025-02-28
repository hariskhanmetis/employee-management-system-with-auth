import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

const routes: Routes = [
  { path: '', component: EmployeeTableComponent },
  { path: 'employee-details/:id', component: EmployeeDetailsComponent }
];

@NgModule({
  declarations: [
    EmployeeTableComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatExpansionModule
  ]
})
export class EmployeeModule { }