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
  title = 'DatingApp';

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {

  }



}
