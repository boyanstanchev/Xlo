import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  constructor(private toastr: ToastrService,
              private router: Router) {
  }


  sendMessage(message: string, receiverId: string, adId: string, adTitle: string) {
    const messagesRef = firebase.database().ref('messages')
    let newStoreRef = messagesRef.push()
    let messageObj = {
      receiverId,
      message,
      adId,
      adTitle,
      senderId: firebase.auth().currentUser.uid
    }
    return newStoreRef.set(messageObj)
  }

  getSentMessagesByProfileId(profileId: string) {
    let dbRef = firebase.database().ref();
    let peep;
    return dbRef.child('messages')
      .orderByChild('senderId')
      .equalTo(profileId)
      .once('value')
      .then((snapshot) => {
        peep = snapshot;
        return peep;
      });
  }

  getRecievedMessagesByProfileId(profileId: string) {
    let dbRef = firebase.database().ref();
    let peep;
    return dbRef.child('messages')
      .orderByChild('receiverId')
      .equalTo(profileId)
      .once('value')
      .then((snapshot) => {
        peep = snapshot;
        return peep;
      });
  }

}
