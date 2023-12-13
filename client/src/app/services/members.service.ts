import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../model/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl+'users', this.getHttpOption());
  }

  getMember(userName: string){
    return this.http.get<Member>(this.baseUrl +"users/"+userName, this.getHttpOption());
  }

  getHttpOption(){
    const userString = localStorage.getItem('user');
    if(!userString) return;

    const user = JSON.parse(userString);
    return {
      headers:new HttpHeaders({
        Authorization: 'Bearer '+ user.token
      })
    }
  }
}
