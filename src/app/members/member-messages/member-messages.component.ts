import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Message} from "../../_models/message";
import {MessageService} from "../../_services/message.service";

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent{
  @Input() username?: string;
  @Input() messages: Message[] = [];

  constructor() {
  }


}
