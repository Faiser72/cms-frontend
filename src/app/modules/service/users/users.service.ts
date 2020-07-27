import { Injectable } from '@angular/core';
import { Api } from 'src/app/api.enum';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  baseUrl = Api.baseUrl;

  constructor(private httpClient: HttpClient) { }

  saveUserDetails(userDetails: any) {
    return this.httpClient.post(`${this.baseUrl}/admin/user/saveUserDetails`, userDetails);
  }

  getAllUserDetails() {
    return this.httpClient.get(`${this.baseUrl}/admin/user/getAllUserDetails`);
  }

  getUserDetails(userId: number) {
    return this.httpClient.get(`${this.baseUrl}/admin/user/getUserDetails/${userId}`);
  }

  updateUserDetails(userDetails: any) {
    return this.httpClient.put(`${this.baseUrl}/admin/user/updateUserDetails`, userDetails);
  }

  deleteUserDetails(userId: any) {
    //   let params = new HttpParams().set('userId', userId);
    //    params = params.append('userId', userId);

    return this.httpClient.put(`${this.baseUrl}/admin/user/deleteUserDetails`, null, { params: { "userId": userId } });
  }

  getAllUserDetailsExceptOneUser(userId: any) {
    return this.httpClient.get(`${this.baseUrl}/admin/user/getAllUserDetailsExceptOneUser`, { params: { "userId": userId } });
  }

  getAllUsers() {
    return this.httpClient.get(`${this.baseUrl}/admin/user/getAllUsers`);
  }

  getAllUsersExceptOneUser(userId: any) {
    return this.httpClient.get(`${this.baseUrl}/admin/user/getAllUsersExceptOneUser`, { params: { "userId": userId } });
  }

  getAllUserType() {
    return this.httpClient.get(`${this.baseUrl}/admin/userType/getAllUserTypeDetails`);
  }

}
