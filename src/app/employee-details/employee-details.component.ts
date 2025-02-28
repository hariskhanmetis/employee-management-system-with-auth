import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  constructor (
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  employee!: Employee;
  panelOpenState = false;

  ngOnInit(): void {
    console.log('Details Component Initialized!');
    const id = this.route.snapshot.paramMap.get('id')?.toString();
    if(id) {
      this.employeeService.getEmployeeById(id).subscribe((data) => {
        this.employee = data;
      })
    }
  }
}
