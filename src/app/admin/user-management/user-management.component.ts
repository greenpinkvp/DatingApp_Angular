import { Component } from '@angular/core';
import { User } from 'src/app/_model/user';
import { AdminService } from 'src/app/_services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent {
  users: User[] = [];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    return this.adminService.getUsersWithRoles().subscribe({
      next: (users) => (this.users = users),
    });
  }
}
