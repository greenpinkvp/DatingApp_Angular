import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Member } from 'src/app/_model/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  // encapsulation: ViewEncapsulation.Emulated,
})
export class MemberCardComponent {
  @Input() member: Member | undefined;
}