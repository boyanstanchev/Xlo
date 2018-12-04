import {Injectable} from '@angular/core'
import {AngularFireDatabase} from 'angularfire2/database'
import {AuthService} from './auth.service'
import {map} from 'rxjs/operators'
import {Message} from '../models/message'
import {ToastrService} from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  constructor(private db: AngularFireDatabase,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  checkIfConversationExists(adId: string, receiverId: string) {
    return this.db.list('conversations', ref => ref.orderByChild('adId').equalTo(adId)).snapshotChanges().pipe(map((cons) => {
      return cons.filter((con) => {
        if (con.payload.val()['senderId'] === this.authService.user.uid && con.payload.val()['receiverId'] === receiverId) {
          return con
        }
      })
    }))
  }

  getUserConversations() {
    return this.db.list('conversations').snapshotChanges().pipe(map((convs) => {
      return convs.filter((con) => {
        if (con.payload.val()['senderId'] || con.payload.val()['receiverId'] === this.authService.user.uid) return con
      })
    }))
  }

  answerConversation(conversationId: string, messageText: string) {
    let messageObj: Message = {
      message: messageText,
      date: Date.now(),
      read: false,
      senderName: this.authService.user.displayName
    }

    const dbRef = this.db.list(`messages/${conversationId}`)
    const promise = dbRef.push(messageObj)
    promise.then(() => this.toastr.success('Message sent.'))
  }

  deleteConversation(conversationId: string) {
    const dbRef = this.db.list(`conversations/${conversationId}`) //TODO: Make this work!
    const promise = dbRef.remove()
    promise.then(() => {
      this.deleteMessagesByConvId(conversationId)
        // .then(() => this.toastr.success('Conversation deleted.'))
    })
  }

  deleteMessagesByConvId(conversationsId: string) {
    const dbRef = this.db.list(`messages/${conversationsId}`)
    return dbRef.remove()
  }

}
