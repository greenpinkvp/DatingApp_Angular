import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = enviroment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsersWithRoles() {
    return this.http.get<User[]>(this.baseUrl + 'admin/users-with-roles');
  }

  getUserWithRoles(userName: string) {
    return this.http.get<User>(
      this.baseUrl + 'admin/user-with-roles/' + userName
    );
  }

  updateUserRoles(userName: string, roles: string) {
    return this.http.post<string[]>(
      this.baseUrl + 'admin/edit-roles/' + userName + '?roles=' + roles,
      {}
    );
  }
}
