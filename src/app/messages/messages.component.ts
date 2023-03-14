import { Component } from '@angular/core';
import { Message } from '../_model/message';
import { Pagination } from '../_model/pagination';
import { MessagesService } from '../_services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  messages?: Message[];
  pagination?: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageService: MessagesService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe({
        next: (response) => {
          this.messages = response.result;
          this.pagination = response.pagination;
          this.loading = false;
        },
      });
  }

  deleteMessage(id: string) {
    this.messageService.deleteMessage(id).subscribe({
      next: () =>
        this.messages?.slice(
          this.messages.findIndex((m) => m.id == id),
          1
        ),
    });
  }

  pageChanged(event: any) {
    if (this.pageNumber != event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }
}
