import {Component, OnInit, ViewChild} from '@angular/core';
import {Member} from "../../_models/member";
import {MemberService} from "../../_services/member.service";
import {ActivatedRoute} from "@angular/router";
import {GalleryItem, ImageItem} from "ng-gallery";
import {TabDirective, TabsetComponent} from "ngx-bootstrap/tabs";
import {MessageService} from "../../_services/message.service";
import {Message} from "../../_models/message";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit{
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
  public member: Member = {} as Member;
  public images: GalleryItem[] = [];
  activeTab?: TabDirective;
  messages: Message[] = [];

  constructor(private memberService: MemberService, private route: ActivatedRoute,
              private messageService: MessageService) {
  }
  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member = data['member']
    })

    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab']);
      }
    })

    this.getImages();
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages'){
      this.loadMessages();
    }
  }

  loadMessages(){
    if(this.member)
      this.messageService.getMessageThread(this.member.username).subscribe({
        next: messages => this.messages = messages
      })
  }

  selectTab(heading: string){
    if(this.memberTabs){
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
    }
  }

  getImages(){
    if(!this.member) return;
    for(let photo of this.member?.photos){
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
    }
  }


}
