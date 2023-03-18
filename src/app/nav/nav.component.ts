import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  model: any = {};
  // currentUser$: Observable<User | null> = of(null);

  constructor(public accountService: AccountService, private router: Router) {}

  // ngOnInit(): void {
  //   this.currentUser$ = this.accountService.currentUserSource$;
  // }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (_) => {
        this.router.navigateByUrl('/members'), (this.model = {});
      }, //_: khong su dung doi so cho method
      //error: (error) => this.toastr.error(error.error),
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
