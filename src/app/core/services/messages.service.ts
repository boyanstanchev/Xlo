import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {ConversationsService} from './conversations.service';
import {ToastrService} from 'ngx-toastr';
import {ModalService} from '../../components/shared/modal/modal.service';
import {Message} from '../models/message';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  constructor(private db: AngularFireDatabase,
              private authService: AuthService,
              private conversationService: ConversationsService,
              private toastr: ToastrService,
              private modalService: ModalService) {
  }

  sendMessage(form, receiverId: string, adId: string, adTitle: string, modalId: number, receiverName: string) {
    this.conversationService.checkIfConversationExists(adId, receiverId).subscribe((convs) => {
      if (convs.length === 0) {
        const dbRef = this.db.list('conversations')
        dbRef.push({
          senderId: this.authService.user.uid,
          senderName: this.authService.user.displayName,
          receiverId,
          adId,
          adTitle,
          receiverName
        })
      } else {
        const messagesRef = this.db.list(`messages/${convs[0].key}`);

        const promise = messagesRef.push({
          message: form.value.message,
          date: Date.now(),
          read: false,
          senderName: this.authService.user.displayName,
        });

        promise.then(() => {
          this.toastr.success('Message send.');
          this.modalService.close(`custom-modal-${modalId}`);
        });
      }
    })
  }

  getMessagesByConversationId(convId: string): Observable<Array<Message>> {
    return this.db.list(`messages/${convId}`).valueChanges().pipe(map((messages: Array<Message>) => {
      messages.forEach((msg) => {
        msg.isSender = msg.senderName === this.authService.user.displayName

        //if (msg.) //TODO set senderPhotoURL
      })

      return messages.sort((a, b) => {
        return +new Date(a.date) - +new Date(b.date)
      })
    }))
  }

}
