import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { ColorModeService } from '../services/color-mode.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee!: Employee;
  panelOpenState = false;
  isDarkMode = false;

  constructor(
    private employeeService: EmployeeService,
    private colorModeService: ColorModeService,
    private route: ActivatedRoute
  ) {}

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.colorModeService.setDarkMode(this.isDarkMode);
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  ngOnInit(): void {
    this.colorModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe((data) => {
        this.employee = data;
      });
    }
  }
}
