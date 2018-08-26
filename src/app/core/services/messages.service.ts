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


  sendMessage(message: string, receiverId: string, adId: string) {
    const messagesRef = firebase.database().ref('messages')
    let newStoreRef = messagesRef.push()
    let messageObj = {
      receiverId,
      message,
      adId,
      senderId: firebase.auth().currentUser.uid
    }
    return newStoreRef.set(messageObj)
  }

  getMessagesByProfileId(profileId: string) {
    const messagesRef = firebase.database().ref('messages')
    let peep
    return messagesRef.once('value')
      .then((snapshot) => {
        peep = snapshot
        return peep
      })
  }

}
