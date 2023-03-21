import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import { Photo } from '../_model/photo';
import { User } from '../_model/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

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

  getPhotoForApproval(pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);

    return getPaginatedResult<Photo[]>(
      this.baseUrl + 'admin/photos-to-moderate',
      params,
      this.http
    );
  }

  approvePhoto(photoId: string) {
    return this.http.post(this.baseUrl + 'admin/approve-photo/' + photoId, {});
  }

  rejectPhoto(photoId: string) {
    return this.http.post(this.baseUrl + 'admin/reject-photo/' + photoId, {});
  }
}
