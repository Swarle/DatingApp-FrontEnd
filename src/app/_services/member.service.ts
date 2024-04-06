import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Member} from "../_models/member";
import {User} from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getMembers(){
    return this.httpClient.get<Member[]>(this.baseUrl + 'user')
  }

  getMember(username: string){
    return this.httpClient.get<Member>(this.baseUrl + `user/${username}`);
  }

}
