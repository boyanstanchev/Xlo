import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Message} from '../models/message';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ConversationsService} from './conversations.service';
import {ToastrService} from 'ngx-toastr';
import {ModalService} from '../../components/shared/modal/modal.service';


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

  sendMessage(form, receiverId: string, adId: string, adTitle: string, modalId: number) {
    this.conversationService.getConvsByAdIdAndReceiverIdOrSenderId(adId, receiverId).subscribe((convs) => {
      if (convs.length === 0) {
        const dbRef = this.db.list('conversations')
        dbRef.push({
          senderId: this.authService.user.uid,
          receiverId,
          adId,
          adTitle
        })
      } else {
        const messagesRef = this.db.list('messages');
        const promise = messagesRef.push({
          message: form.value.message,
          adId,
          adTitle,
          date: Date.now(),
          read: false,
          conversationId: convs[0].key
        });
        promise.then(() => {
          this.toastr.success('Message send.');
          this.modalService.close(`custom-modal-${modalId}`);
        });
      }
    })
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

      return messages;
    }));
  }

}
