import {Component, OnInit} from '@angular/core';
import {AdsService} from '../../../core/services/ads.service';
import {AuthService} from '../../../core/services/auth.service';
import {ShoppingCartService} from '../../../core/services/shopping-cart.service';
import {ModalService} from '../../shared/modal/modal.service';
import {MessagesService} from '../../../core/services/messages.service';
import {ToastrService} from 'ngx-toastr';
import * as firebase from 'firebase';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: []
})
export class FeaturedComponent implements OnInit {
  featuredAds: Array<any> = []

  constructor(private adsService: AdsService,
              public authService: AuthService,
              private cartService: ShoppingCartService,
              private modalService: ModalService,
              private messagesService: MessagesService,
              private toastr: ToastrService) {}

  addToCart(adTitle: string, adId: string, adPrice: string) {
    this.cartService.add(adTitle, adId, adPrice)
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  message(form, profileId, adId, adTitle) {
    let message = form.value.message
    this.messagesService.sendMessage(message, profileId, adId, adTitle)
      .then(() => {
        this.toastr.success('Message send.')
        this.closeModal('custom-modal-4')
      })
      .catch(err => this.toastr.error(err.message))
  }

  ngOnInit() {
    this.adsService.getFeaturedAds()
      .subscribe((ads) => {
        this.featuredAds = []
        ads.forEach((ad) => {
          if (ad.payload.val()['featured']) {
            let isCreator = false;
            if (firebase.auth().currentUser && firebase.auth().currentUser.uid == ad.payload.val()['creator']) {
              isCreator = true;
            }
            this.featuredAds.push({
              'id': ad.key,
              'imageUrl': ad.payload.val()['imageUrl'],
              'price': ad.payload.val()['price'],
              'title': ad.payload.val()['title'],
              'condition': ad.payload.val()['condition'],
              'creator': ad.payload.val()['creator'],
              isCreator
            });
          }
        });
      });
  }

}
