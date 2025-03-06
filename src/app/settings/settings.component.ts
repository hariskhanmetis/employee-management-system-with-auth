import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(private router: Router) {}

  onTabChange(event: any) {
    const routes = ['profile-information', 'manage-account']; // Tab index mapping
    this.router.navigate([`/employee-details/${routes[event.index]}`]);
  }
}
