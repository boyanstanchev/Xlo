import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../../core/services/messages.service';
import * as firebase from 'firebase';
import {AuthService} from '../../../core/services/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: []
})
export class MyProfileComponent implements OnInit {
  sent: boolean = false;
  received: boolean = true;
  sentMessages = [];
  receivedMessages = [];
  displayName: string;

  constructor(private messagesService: MessagesService,
              private authService: AuthService,
              private auth: AngularFireAuth) {
  }

  show() {
    this.sent = !this.sent;
    this.received = !this.received;
  }

  ngOnInit() {
    this.messagesService.getMessagesByProfileId(firebase.auth().currentUser.uid, true)
      .subscribe((messages) => {
        messages.forEach((message) => {
          this.authService.getUserData(message.payload.val()['receiverId'])
            .subscribe((users) => {
              this.sentMessages.push({
                receiverName: users[0].payload.val()['displayName'],
                adTitle: message.payload.val()['adTitle'],
                message: message.payload.val()['message'],
                adId: message.payload.val()['adId']
              });
            });
        });
      });

    this.messagesService.getMessagesByProfileId(firebase.auth().currentUser.uid, false)
      .subscribe((messages) => {
        messages.forEach((message) => {
          this.authService.getUserData(message.payload.val()['senderId'])
            .subscribe((users) => {
              this.receivedMessages.push({
                senderName: users[0].payload.val()['displayName'],
                adTitle: message.payload.val()['adTitle'],
                message: message.payload.val()['message'],
                adId: message.payload.val()['adId']
              });
            });
        });
      });
  }

}
