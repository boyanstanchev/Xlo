import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  constructor(private db: AngularFireDatabase) {}

  sendMessage(message: string, receiverId: string, adId: string, adTitle: string) {
    const messagesRef = this.db.list('messages')
    return messagesRef.push({
      receiverId,
      message,
      adId,
      adTitle,
      senderId: firebase.auth().currentUser.uid
    })
  }

  getMessagesByProfileId(profileId: string, sent: boolean) {
    return sent ? this.db.list('messages', ref => ref.orderByChild('senderId').equalTo(profileId)).snapshotChanges() : this.db.list('messages', ref => ref.orderByChild('receiverId').equalTo(profileId)).snapshotChanges()
  }

}
