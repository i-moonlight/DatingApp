import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  baseUrl = 'https://localhost:5001/api/';
  constructor(private http:HttpClient) { }

  login(model: any){
    return this.http.post<User>(this.baseUrl+'account/login', model).pipe(
      map((response: User) =>{
        const user = response
        if(user){
          localStorage.setItem('user', JSON.stringify(user))
        }
      } )
    );
  }

  logout(){
    localStorage.removeItem('user');
  }
}
