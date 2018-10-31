import {AuthService} from '../../../core/services/auth.service';
import {ConversationsService} from '../../../core/services/conversations.service';
import {AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MessagesService} from '../../../core/services/messages.service';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {Message} from '../../../core/models/message';
import {ToastrService} from 'ngx-toastr';
import {AdsService} from '../../../core/services/ads.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  conversations = [];
  userAds

  constructor(public convService: ConversationsService,
              public dialog: MatDialog,
              public authService: AuthService,
              private adsService: AdsService) {
  }

  openDialog(conversationId): void {
    this.dialog.open(MessagesDialog, {
      width: '700px',
      height: 'fit-content',
      data: conversationId
    });
  }

  deleteAd(adId: string) {
    this.adsService.deleteAd(adId)
  }

  ngOnInit() {
    this.convService.getUserConversations().subscribe(convs => this.conversations = convs);
    this.adsService.getAdsByUserId(this.authService.user.uid).subscribe(ads => this.userAds = ads)

  }
}




@Component({
  selector: 'messages-dialog',
  templateUrl: 'messages-dialog.html',
  styleUrls: ['messages-dialog.css']
})

export class MessagesDialog implements AfterViewInit {
  conversationMessages: Array<Message> = []
  message: string = ''

  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: string,
              private conversationService: ConversationsService,
              private messagesService: MessagesService,
              private toastr: ToastrService) {

    this.messagesService.getMessagesByConversationId(data).subscribe((messages: Array<Message>) => {
      messages[0].conversationId = data
      this.conversationMessages = messages
    });
  }

  answer(conversationId: string) {
    if (this.message.trim().length > 2) {
      this.conversationService.answerConversation(conversationId, this.message)
      this.message = ''
    } else {
      this.toastr.error('Message must be at least two characters long.')
    }
  }

  ngAfterViewInit() {
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {
      this.toastr.error(err)
    }
  }

}
