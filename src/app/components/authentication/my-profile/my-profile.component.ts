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
  sentMessages: Array<Message> = [];
  receivedMessages: Array<Message> = [];
  animal

  constructor(private messagesService: MessagesService,
              private authService: AuthService,
              public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MessagesDialog, {
      width: '250px',
      data: {name: 'Boyan', animal: 'Stanchev'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
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
