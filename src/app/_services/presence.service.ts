import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, take } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl = enviroment.hubUrl;
  private hubConnection?: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private toastr: ToastrService, private router: Router) {}

  createHubconnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on('UserIsOnline', (userName) => {
      this.onlineUsers$.pipe(take(1)).subscribe({
        next: (usernames) =>
          this.onlineUsersSource.next([...usernames, userName]),
      });
    });

    this.hubConnection.on('UserIsOffline', (userName) => {
      this.onlineUsers$.pipe(take(1)).subscribe({
        next: (usernames) =>
          this.onlineUsersSource.next(usernames.filter((x) => x !== userName)),
      });
    });

    this.hubConnection.on('GetOnlineUsers', (userNames) => {
      this.onlineUsersSource.next(userNames);
    });

    this.hubConnection.on('NewMessageReceived', ({ userName, knownAs }) => {
      this.toastr
        .info(knownAs + ' has sent you a new message! Click me to see it')
        .onTap.pipe(take(1))
        .subscribe({
          next: () =>
            this.router.navigateByUrl('/members/' + userName + '?tab=Messages'), 
        });
    });
  }

  stopHubConnection() {
    this.hubConnection?.stop().catch((error) => console.log(error));
  }
}
