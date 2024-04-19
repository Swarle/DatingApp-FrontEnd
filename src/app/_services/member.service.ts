import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Member} from "../_models/member";
import {map, of} from "rxjs";
import {PaginatedResult} from "../_models/pagination";
import {UserParams} from "../_models/userParams";
import {getPaginatedResult, getPaginationHeaders} from "./paginationHelper";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private httpClient: HttpClient) { }

  getMembers(userParams: UserParams){
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Member[]>(this.baseUrl + 'user', params, this.httpClient);
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

  addLike(username: string){
    return this.httpClient.post(this.baseUrl + `likes/${username}`, {});
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number){
    let params = getPaginationHeaders(pageNumber, pageSize);

    params = params.append('predicate', predicate);

    return getPaginatedResult<Member[]>(this.baseUrl + 'likes', params, this.httpClient);
  }

  deletePhoto(photoId: number){
    return this.httpClient.delete(this.baseUrl + 'user/delete-photo/' + photoId);
  }
}
