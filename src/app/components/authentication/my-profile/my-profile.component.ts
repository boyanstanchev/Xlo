import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../../core/services/messages.service';
import {AuthService} from '../../../core/services/auth.service';
import {Message} from '../../../core/models/message';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: []
})
export class MyProfileComponent implements OnInit {
  sent: boolean = false;
  received: boolean = true;
  sentMessages: Array<Message> = [];
  receivedMessages: Array<Message> = [];

  constructor(private messagesService: MessagesService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.messagesService.getMessagesByProfileId(this.authService.user.uid, true)
      .subscribe((messages) => {
        this.sentMessages = messages
      })
    this.messagesService.getMessagesByProfileId(this.authService.user.uid, false)
      .subscribe((messages) => {
        this.receivedMessages = messages
      })
  }

}
