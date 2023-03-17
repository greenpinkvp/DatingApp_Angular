import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/_model/message';
import { MessagesService } from 'src/app/_services/messages.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent {
  @ViewChild('messageForm') messageForm?: NgForm;
  @Input() userName?: string;
  // @Input() messages: Message[] = [];
  messageContent = '';

  constructor(public messageService: MessagesService) {}

  sendMessage() {
    if (!this.userName) {
      return;
    }

    this.messageService
      .sendMessage(this.userName, this.messageContent)
      .then(() => {
        this.messageForm?.reset();
      });
    // .subscribe({
    //   next: (message) => {
    //      this.messages.push(message);
    //      this.messageForm?.reset();
    //   },
    // });
  }
}
