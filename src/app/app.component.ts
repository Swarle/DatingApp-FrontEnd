import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AccountService} from "./_services/account.service";
import {User} from "./_models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'DatingApp-FrontEnd';
  public users: any;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getUsers();
    // this.setCurrentUser();
  }

  getUsers(){
    this.httpClient.get('https://localhost:7059/api/user').subscribe({
      next: response => this.users = response,
      error: error => console.log(error)
    });
  }

  // setCurrentUser(){
  //   const userString = localStorage.getItem('user');
  //
  //   if(!userString) return;
  //
  //   const user: IUser = JSON.parse(userString);
  //   this.accountService.setCurrentUser(user);
  // }

}
