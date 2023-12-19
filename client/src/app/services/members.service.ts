import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../model/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http:HttpClient) { }

  getMembers(){
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl+'users').pipe(
      map(members => {
        this.members = members;
        return this.members;
      })
    );
  }

  getMember(userName: string){
    const member = this.members.find(x=>x.userName ===userName);
    if(member) return of(member);

    return this.http.get<Member>(this.baseUrl +"users/"+userName);
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl+"users", member).pipe(
      map(()=>{
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member}
      })
    );
  }
}
