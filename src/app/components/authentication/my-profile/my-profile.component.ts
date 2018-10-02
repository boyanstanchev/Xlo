import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../../core/services/messages.service';
import * as firebase from 'firebase';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: []
})
export class MyProfileComponent implements OnInit {
  sent: boolean = false
  received: boolean = true
  sentMessages = []
  receivedMessages = []
  displayName: string

  constructor(private messagesService: MessagesService,
              private authService: AuthService) {}

  show() {
    this.sent = !this.sent
    this.received = !this.received
  }

  ngOnInit() {
    this.authService.getUserNameById(firebase.auth().currentUser.uid)
      .then((snapshot) => {
        snapshot.forEach((child) => {
          this.displayName = child.val().displayName
        })
      })

    this.messagesService.getMessagesByProfileId(firebase.auth().currentUser.uid, true)
      .subscribe((messages) => {
        messages.forEach((message) => {
          this.authService.getUserNameById(message.payload.val()['receiverId'])
            .then((name) => {
              name.forEach((child) => {
                this.sentMessages.push({
                  receiverName: child.val().displayName,
                  adTitle: message.payload.val()['adTitle'],
                  message: message.payload.val()['message'],
                  adId: message.payload.val()['adId']
                })
              })
            })
        })
      })

    this.messagesService.getMessagesByProfileId(firebase.auth().currentUser.uid, false)
      .subscribe((messages) => {
        messages.forEach((message) => {
          this.authService.getUserNameById(message.payload.val()['senderId'])
            .then((name) => {
              name.forEach((child) => {
                this.receivedMessages.push({
                  senderName: child.val().displayName,
                  adTitle: message.payload.val()['adTitle'],
                  message: message.payload.val()['message'],
                  adId: message.payload.val()['adId']
                })
              })
            })
        })
      })
  }

}
