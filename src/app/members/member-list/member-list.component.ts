import {Component, OnInit} from '@angular/core';
import {Member} from "../../_models/member";
import {MemberService} from "../../_services/member.service";
import {Observable, take} from "rxjs";
import {Pagination} from "../../_models/pagination";
import {UserParams} from "../../_models/userParams";
import {AccountService} from "../../_services/account.service";
import {User} from "../../_models/user";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit{
  public members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  user: User | undefined;
  genderList =
    [{value: 'male', display: 'Male'},
    {value: 'female', display: 'Female'}]


  constructor(private memberService: MemberService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user){
          this.userParams = new UserParams(user);
          this.user = user;
        }
      }
    })
  }

  ngOnInit(): void {
      this.loadMembers()
    }

  loadMembers(){
    if(!this.userParams) return;

    this.memberService.getMembers(this.userParams).subscribe({
      next: response => {
        if(response.result && response.pagination){
          this.members = response.result;
          this.pagination = response.pagination
        }
      }
    });
  }

  pageChanged(event: any){
    if (this.userParams && event.page !== this.userParams.pageNumber){
      this.userParams.pageNumber = event.page;
      this.loadMembers();
    }
  }

  resetFilters(){
    if(this.user){
      this.userParams = new UserParams(this.user);
      this.loadMembers();
    }
  }

}
