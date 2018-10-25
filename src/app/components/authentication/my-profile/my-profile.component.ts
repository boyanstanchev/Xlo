import { ConversationsService } from './../../../core/services/conversations.service';
import {Component, Inject, OnInit} from '@angular/core';
import {MessagesService} from '../../../core/services/messages.service';
import {AuthService} from '../../../core/services/auth.service';
import {Message} from '../../../core/models/message';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: []
})
export class MyProfileComponent implements OnInit {
  conversations = []

  constructor(private messagesService: MessagesService,
              private convService: ConversationsService,
              private authService: AuthService,
              public dialog: MatDialog) {
  }

  openDialog(conversationId): void {
    console.log(conversationId)
    const dialogRef = this.dialog.open(MessagesDialog, {
      width: '500px',
      height: '400px', //This could be array of messages.lengh * 20px per message!
      data: '<arrayOfMessages!>'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Result: ', result)
    });
  }

  ngOnInit() {
    this.convService.getUserConversations().subscribe((convs) => {
      console.log(convs)
      this.conversations = convs
    })
  }

}

@Component({
  selector: 'messages-dialog',
  templateUrl: 'messages-dialog.html',
})
export class MessagesDialog {

  constructor(
    public dialogRef: MatDialogRef<MessagesDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
