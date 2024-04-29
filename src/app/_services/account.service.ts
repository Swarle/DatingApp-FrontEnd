import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:7059/api/';
  private currentUserSource : BehaviorSubject<User | null>;
  currentUser$: Observable<User | null>;
  constructor(private httpClient: HttpClient) {
    this.currentUserSource = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user')!));
    this.currentUser$ = this.currentUserSource.asObservable();
  }

  login(model: any){
    return this.httpClient.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) =>{
        const user = response;
        if(user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: any){
    return this.httpClient.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
