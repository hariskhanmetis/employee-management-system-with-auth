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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NavComponent } from '../nav/nav.component';
import { MatListModule } from '@angular/material/list';
import { OverviewComponent } from '../overview/overview.component';
import { ProjectsComponent } from '../projects/projects.component';
import { SettingsComponent } from '../settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'employee-details', pathMatch: 'full' },
  { path: 'employee-details', component: EmployeeDetailsComponent, children: [
    { path: '', redirectTo: 'table', pathMatch: 'full' },
    { path: 'overview', component: OverviewComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'table', component: EmployeeTableComponent }
  ]}
];

@NgModule({
  declarations: [
    EmployeeTableComponent,
    EmployeeDetailsComponent,
    NavComponent,
    OverviewComponent,
        ProjectsComponent,
        SettingsComponent
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
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatGridListModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule
  ]
})
export class EmployeeModule { }