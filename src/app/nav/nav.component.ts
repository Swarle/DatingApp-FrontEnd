import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Observable} from "rxjs";
import {User} from "../_models/user";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {}
  public currentUser$: Observable<User | null>;

  constructor(private accountService: AccountService) {
    this.currentUser$ = accountService.currentUser$;
  }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => console.log(err)
    });
  }

  logout(){
    this.accountService.logout();
  }

}
