import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_model/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  // encapsulation: ViewEncapsulation.Emulated,
})
export class MemberCardComponent {
  @Input() member: Member | undefined;

  constructor(
    private memberService: MembersService,
    private toastr: ToastrService
  ) {}

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe({
      next: () => this.toastr.success('You have liked ' + member.knownAs),
    });
  }
}
