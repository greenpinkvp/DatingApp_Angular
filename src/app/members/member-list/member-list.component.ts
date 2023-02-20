import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_model/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent {
  // members: Member[] = [];
  members$:Observable<Member[]> | undefined;

  constructor(private memberService: MembersService) {}

  // loadMembers() {
  //   this.memberService.getMembers().subscribe({
  //     next: (members) => (this.members = members),
  //   });
  // }

  ngOnInit():void{
    // this.loadMembers();
    this.members$ = this.memberService.getMembers();
  }
}
