import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Observable} from "rxjs";
import {User} from "../_models/user";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {}
  public currentUser$: Observable<User | null>;

  constructor(private accountService: AccountService, private router: Router,
              private toastr: ToastrService) {
    this.currentUser$ = accountService.currentUser$;
  }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/');
      },
      error: err => this.toastr.error(err.error)
    });
  }

  logout(){
    this.accountService.logout();
  }

}
