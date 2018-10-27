import {AuthService} from '../../../core/services/auth.service';
import {ConversationsService} from '../../../core/services/conversations.service';
import {Component, Inject, OnInit} from '@angular/core';
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

  constructor(private messagesService: MessagesService,
              private convService: ConversationsService,
              public dialog: MatDialog,
              private toastr: ToastrService,
              public authService: AuthService) {
  }

  openDialog(conversationId): void {
    this.messagesService.getMessagesByConversationId(conversationId).subscribe((messages: Array<Message>) => {
      const dialogRef = this.dialog.open(MessagesDialog, {
        width: '700px',
        height: `fit-content`,
        data: messages
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && result.trim().length >= 2) {
          this.convService.answerConversation(conversationId, result); //TODO Make it so it doesn't close the modal! It will be very cool
        } else if (result && result.trim().length <= 0) {
          this.toastr.error('Error message must not be empty.');
        }
      });
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

export class MessagesDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Array<Message>) {
  }
}
