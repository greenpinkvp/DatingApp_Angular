import { Component, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_model/user';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-user-edit-roles',
  templateUrl: './user-edit-roles.component.html',
  styleUrls: ['./user-edit-roles.component.css'],
})
export class UserEditRolesComponent {
  user: User = {} as User;
  selectedRoles: any[] = [];
  availableRoles = ['Administrator', 'Moderator', 'Member'];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserWithRoles();
  }

  getUserWithRoles() {
    const userName = this.route.snapshot.paramMap.get('userName');

    if (!userName) return;

    this.adminService.getUserWithRoles(userName).subscribe({
      next: (user) => {
        (this.user = user),
          user.roles.forEach((element) => {
            this.selectedRoles.push(element);
          });
      },
    });
  }

  updateChecked(checkedValue: string) {
    const index = this.selectedRoles.indexOf(checkedValue);
    index !== -1
      ? this.selectedRoles.splice(index, 1)
      : this.selectedRoles.push(checkedValue);
  }

  updateRoles(user: User) {
    if (!this.arrayEqual(this.selectedRoles, this.user.roles)) {
      const selectedRoles = this.selectedRoles.join();

      this.adminService
        .updateUserRoles(this.user.userName, selectedRoles)
        .subscribe({
          next: (roles) => {
            (this.selectedRoles = roles),
              this.toastr.success('User roles updated successfully');
          },
        });
    }
  }

  private arrayEqual(arr1: any[], arr2: any[]) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }
}
