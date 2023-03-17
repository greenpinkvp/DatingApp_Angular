import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';
import { BehaviorSubject, take } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { Group } from '../_model/group';
import { Message } from '../_model/message';
import { User } from '../_model/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  baseUrl = enviroment.apiUrl;
  hubUrl = enviroment.hubUrl;
  private hubConnection?: HubConnection;

  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(private http: HttpClient) {}

  createHubConnection(user: User, otherUserName: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUserName, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));
    this.hubConnection.on('ReceiveMessageThread', (messages) => {
      this.messageThreadSource.next(messages);
    });

    this.hubConnection.on('UpdatedGroup', (group: Group) => {
      if (group.connections.some((x) => x.userName === otherUserName)) {
        this.messageThread$.pipe(take(1)).subscribe({
          next: (messages) => {
            messages.forEach((message) => {
              if (!message.dateRead) {
                message.dateRead == new Date(Date.now());
              }
            });

            this.messageThreadSource.next([...messages]);
          },
        });
      }
    });

    this.hubConnection.on('NewMessages', (message) => {
      this.messageThread$.pipe(take(1)).subscribe({
        next: (messages) => {
          this.messageThreadSource.next([...messages, message]);
        },
      });
    });
  }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);

    return getPaginatedResult<Message[]>(
      this.baseUrl + 'messages',
      params,
      this.http
    );
  }

  getMessageThread(userName: string) {
    return this.http.get<Message[]>(
      this.baseUrl + 'messages/thread/' + userName
    );
  }

  async sendMessage(userName: string, content: string) {
    //send not using hub
    // return this.http.post<Message>(this.baseUrl + 'messages', {
    //   recipientUserName: userName,
    //   content,
    // });

    //send using hub
    return this.hubConnection
      ?.invoke('SendMessage', { recipientUserName: userName, content })
      .catch((error) => console.log(error));
  }

  deleteMessage(id: string) {
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection?.stop().catch((error) => console.log(error));
    }
  }
}
