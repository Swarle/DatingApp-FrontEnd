import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Member} from "../_models/member";
import {User} from "../_models/user";
import {map, of} from "rxjs";
import {PaginatedResult} from "../_models/pagination";
import {UserParams} from "../_models/userParams";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private httpClient: HttpClient) { }

  getMembers(userParams: UserParams){
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginatedResult<Member[]>(this.baseUrl + 'user', params);
  }

  private getPaginatedResult<T>(url: string, params: HttpParams){
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.httpClient.get<T>(url, {observe: 'response', params}).pipe(
      map(response => {
        if(response.body){
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if(pagination){
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    )
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) : HttpParams{
    let params = new HttpParams();

    if(pageNumber && pageSize){
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    return params;
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
