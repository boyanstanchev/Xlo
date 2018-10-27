import {AuthService} from '../../../core/services/auth.service';
import {ConversationsService} from '../../../core/services/conversations.service';
import {AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MessagesService} from '../../../core/services/messages.service';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {Message} from '../../../core/models/message';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: []
})
export class MyProfileComponent implements OnInit {
  conversations = [];

  constructor(private convService: ConversationsService,
              public dialog: MatDialog,
              public authService: AuthService) {
  }

  openDialog(conversationId): void {
    this.dialog.open(MessagesDialog, {
      width: '700px',
      height: `fit-content`,
      data: conversationId
    });
  }

  ngOnInit() {
    this.convService.getUserConversations().subscribe(convs => this.conversations = convs);
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
      this.conversationMessages = messages
    });
  }

  answer(conversationId: string) {
    if (this.message.trim().length > 1) {
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
      console.log(err)
    }
  }

}
