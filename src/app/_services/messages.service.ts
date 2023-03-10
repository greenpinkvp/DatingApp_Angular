import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import { Message } from '../_model/message';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  baseUrl = enviroment.apiUrl;
  constructor(private http: HttpClient) {}

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);

    return getPaginatedResult<Message[]>(
      this.baseUrl + 'messages',
      params,
      this.http
    );
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(
      this.baseUrl + 'messages/thread/' + username
    );
  }

  sendMessage(username: string, content: string) {
    return this.http.post<Message>(this.baseUrl + 'messages', {
      recipientUsername: username,
      content,
    });
  }

  deleteMessage(id: string) {
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }
}
