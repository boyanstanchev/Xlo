import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {AdsService} from '../../../core/services/ads.service';
import {ModalService} from '../../shared/modal/modal.service';
import {MessagesService} from '../../../core/services/messages.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: []
})
export class ProfileComponent implements OnInit {
  userName: string
  userAds = []

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private adsService: AdsService,
              private modalService: ModalService,
              private messagesService: MessagesService,
              private toastr: ToastrService) {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  message(form, profileId, adId, adTitle) {
    let message = form.value.message
    this.messagesService.sendMessage(message, profileId, this.route.snapshot.params['id'], adTitle)
      .then(() => {
        this.toastr.success('Message send.')
        this.closeModal('custom-modal-3')
      })
      .catch(err => this.toastr.error(err.message))
  }

  ngOnInit() {
    this.authService.getUserNameById(this.route.snapshot.params['id'])
      .then((snapshot) => {
        snapshot.forEach((child) => {
          this.userName = child.val().displayName
        });
      })

    this.adsService.getAdsByUserId(this.route.snapshot.params['id'])
      .subscribe((ads) => {
        ads.forEach((ad) => {
          this.userAds.push({
            id: ad.key,
            title: ad.payload.val()['title'],
            price: ad.payload.val()['price'],
            creator: ad.payload.val()['creator']
          })
        })
      })
  }

}
