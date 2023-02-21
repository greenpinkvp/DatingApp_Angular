import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { Member } from '../_model/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = enviroment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) {}

  getMembers() {
    if (this.members.length > 0) {
      return of(this.members);
    }
    return this.http
      .get<Member[]>(
        this.baseUrl + 'users'
        //, this.getHttpOptions()
      )
      .pipe(
        map((members) => {
          this.members = members;
          return members;
        })
      );
  }

  getMember(username: string) {
    const member = this.members.find((x) => x.username === username);
    if (member) {
      return of(member);
    }
    return this.http.get<Member>(
      this.baseUrl + 'users/' + username
      //, this.getHttpOptions()
    );
  }

  // getHttpOptions() {
  //   const userString = localStorage.getItem('user');

  //   if (!userString) return;

  //   const user = JSON.parse(userString);

  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + user.token,
  //     }),
  //   };
  // }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member };
      })
    );
  }

  setMainPhoto(photoId: string) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId:string){
    return this.http.delete(this.baseUrl+'users/delete-photo/' + photoId);
  }
}
