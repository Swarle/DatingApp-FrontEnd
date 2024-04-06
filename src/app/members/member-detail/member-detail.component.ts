import {Component, OnInit} from '@angular/core';
import {Member} from "../../_models/member";
import {MemberService} from "../../_services/member.service";
import {ActivatedRoute} from "@angular/router";
import {GalleryItem, ImageItem} from "ng-gallery";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit{
  public member: Member | undefined;
  public images: GalleryItem[] = [];
  constructor(private memberService: MemberService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
      this.loadMember()
  }

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        this.getImages();
      }
    })
  }

  getImages(){
    if(!this.member) return;
    for(let photo of this.member?.photos){
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
    }
  }


}
