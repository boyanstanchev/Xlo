import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Message} from '../models/message';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  constructor(private db: AngularFireDatabase,
              private auth: AngularFireAuth,
              private authService: AuthService) {
  }

  sendMessage(message: string, receiverId: string, adId: string, adTitle: string) {
    const messagesRef = this.db.list('messages');
    return messagesRef.push({
      receiverId,
      message,
      adId,
      adTitle,
      senderId: this.auth.auth.currentUser.uid
    });
  }

  getMessagesByProfileId(profileId: string, sent: boolean): Observable<Message[]> {
    let dbRef = this.db.list('messages', ref => ref.orderByChild('receiverId').equalTo(profileId)).valueChanges();

    if (sent) {
      dbRef = this.db.list('messages', ref => ref.orderByChild('senderId').equalTo(profileId)).valueChanges();
    }

    return dbRef.pipe(map((messages: Array<Message>) => {
      messages.forEach((message) => {

        if (sent) {
          this.authService.getUserDisplayName(message.receiverId)
            .subscribe((displayName) => {
              message.receiverName = displayName;
            });
        }

        this.authService.getUserDisplayName(message.senderId)
          .subscribe((displayName) => {
            message.senderName = displayName;
          });
      });

      return messages
    }));
  }

}
