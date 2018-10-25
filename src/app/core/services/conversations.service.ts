import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {
  }

  getConvsByAdIdAndReceiverIdOrSenderId(adId: string, receiverId: string, sender: boolean = false, receiver: boolean = false) {
    return this.db.list('conversations', ref => ref.orderByChild('adId').equalTo(adId)).snapshotChanges().pipe(map((cons) => {
      return cons.filter((con) => { // if .map is used it returns undefined https://stackoverflow.com/questions/16037049/why-does-javascript-map-function-return-undefined
        if (con.payload.val()['senderId'] === this.authService.user.uid && con.payload.val()['receiverId'] === receiverId) {
          return con
        } else if (receiver && con.payload.val()['receiverId'] === receiverId) {
          return con
        } else if (sender && con.payload.val()['senderId'] === this.authService.user.uid) {
          return con
        }
      })
    }))
  }

  getUserConversations() {
    return this.db.list('conversations', ref => ref.orderByChild('receiverId').equalTo(this.authService.user.uid)).snapshotChanges()
  }

}
