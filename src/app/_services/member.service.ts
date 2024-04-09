import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Member} from "../_models/member";
import {User} from "../_models/user";
import {map, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private httpClient: HttpClient) { }

  getMembers(){
    if(this.members.length > 0) return of(this.members);
    return this.httpClient.get<Member[]>(this.baseUrl + 'user').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    )
  }

  getMember(username: string){
    const member = this.members.find(x => x.username === username);
    if(member) return of(member);
    return this.httpClient.get<Member>(this.baseUrl + `user/${username}`);
  }

  updateMember(member: Member){
    return this.httpClient.put(this.baseUrl + 'user', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member}
      })
    );
  }

  setMainPhoto(photoId: number){
    return this.httpClient.put(this.baseUrl + 'user/set-main-photo/' + photoId,{});
  }

  deletePhoto(photoId: number){
    return this.httpClient.delete(this.baseUrl + 'user/delete-photo/' + photoId);
  }
}
