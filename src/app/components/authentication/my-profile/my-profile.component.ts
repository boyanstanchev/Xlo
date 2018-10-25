import {ConversationsService} from '../../../core/services/conversations.service';
import {Component, Inject, OnInit} from '@angular/core';
import {MessagesService} from '../../../core/services/messages.service';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {Message} from '../../../core/models/message';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: []
})
export class MyProfileComponent implements OnInit {
  conversations = [];

  constructor(private messagesService: MessagesService,
              private convService: ConversationsService,
              public dialog: MatDialog) {
  }

  openDialog(conversationId): void {
    this.messagesService.getMessagesByConversationId(conversationId).subscribe((messages: Array<Message>) => {
      const dialogRef = this.dialog.open(MessagesDialog, {
        width: '700px',
        height: `fit-content`, //This could be the length of messages array * 20px per message!
        data: messages
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.convService.answerConversation(conversationId, result) //TODO Make it so it doesn't close the modal! It will be very cool
        }
      });
    })
  }

  ngOnInit() {
    this.convService.getUserConversations().subscribe((convs) => {
      this.conversations = convs;
    });
  }

}

@Component({
  selector: 'messages-dialog',
  templateUrl: 'messages-dialog.html',
  styleUrls: ['messages-dialog.css']
})
export class MessagesDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Array<Message>) {
  }
}
