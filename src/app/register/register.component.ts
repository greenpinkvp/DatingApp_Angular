import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // @Input() userFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  model: any = {};

  register() {
    this.accountService.register(this.model).subscribe({
      next: (response) => this.cancel,
      error: (error) => this.toastr.error(error.error),
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
