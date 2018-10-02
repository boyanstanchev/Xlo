import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdsService} from '../../../core/services/ads.service';
import {CategoriesService} from '../../../core/services/categories.service';
import {AuthService} from '../../../core/services/auth.service';
import {ModalService} from '../../shared/modal/modal.service';
import {MessagesService} from '../../../core/services/messages.service';
import {ToastrService} from 'ngx-toastr';
import * as firebase from 'firebase';
import {ShoppingCartService} from '../../../core/services/shopping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: []
})
export class DetailsComponent implements OnInit {
  ad;
  isCreator: boolean = false;

  constructor(private route: ActivatedRoute,
              private adsService: AdsService,
              public authService: AuthService,
              public categoriesService: CategoriesService,
              public modalService: ModalService,
              private messagesService: MessagesService,
              private toastr: ToastrService,
              private cartService: ShoppingCartService) {
  }

  message(form, profileId, adTitle) {
    let message = form.value.message;
    this.messagesService.sendMessage(message, profileId, this.route.snapshot.params['id'], adTitle)
      .then(() => {
        this.toastr.success('Message send.');
        this.modalService.close('custom-modal-1');
      })
  }

  addToCart(adTitle: string, adId: string, adPrice: string) {
    this.cartService.add(adTitle, adId, adPrice)
  }

  ngOnInit() {
    this.adsService.getAdById(this.route.snapshot.params['id'])
      .subscribe((ads) => {
        ads.forEach((ad) => {
          this.categoriesService.getCategoryNameById(ad.payload.val()['category'], false)
            .subscribe((cats) => {
              cats.forEach((cat) => {
                this.ad['categoryName'] = cat.payload.val()['name'];
              });
            });

          this.categoriesService.getCategoryNameById(ad.payload.val()['subCategory'], true)
            .subscribe((cats) => {
              cats.forEach((cat) => {
                this.ad['subCategoryName'] = cat.payload.val()['name'];
              });
            });

          this.authService.getUserNameById(ad.payload.val()['creator'])
            .then((snapshot) => {
              snapshot.forEach((child) => {
                this.ad['creatorUserName'] = child.val().displayName;
              });
            });

          if (firebase.auth().currentUser) {
            this.isCreator = this.authService.userId === ad.payload.val()['creator'];
          }


          this.ad = {
            id: ad.key,
            title: ad.payload.val()['title'],
            condition: ad.payload.val()['condition'],
            category: ad.payload.val()['category'],
            subCategory: ad.payload.val()['subCategory'],
            featured: ad.payload.val()['featured'],
            model: ad.payload.val()['model'],
            price: ad.payload.val()['price'],
            imageUrl: ad.payload.val()['imageUrl'],
            creator: ad.payload.val()['creator']
          };
        });
      });
  }
}
