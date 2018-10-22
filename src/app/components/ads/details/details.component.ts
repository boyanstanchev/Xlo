import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdsService} from '../../../core/services/ads.service';
import {CategoriesService} from '../../../core/services/categories.service';
import {AuthService} from '../../../core/services/auth.service';
import {ModalService} from '../../shared/modal/modal.service';
import {MessagesService} from '../../../core/services/messages.service';
import {ToastrService} from 'ngx-toastr';
import {ShoppingCartService} from '../../../core/services/shopping-cart.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {map} from 'rxjs/operators';

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
              public cartService: ShoppingCartService,
              private auth: AngularFireAuth) {
  }

  message(form, profileId, adTitle) {
    let message = form.value.message;
    this.messagesService.sendMessage(message, profileId, this.route.snapshot.params['id'], adTitle)
      .then(() => {
        this.toastr.success('Message send.');
        this.modalService.close('custom-modal-1');
      });
  }

  ngOnInit() {
    this.adsService.getAdById(this.route.snapshot.params['id'])
      .subscribe((ads) => {
        if (ads.length > 0) {
          this.ad = {
            id: ads[0].key,
            title: ads[0].payload.val()['title'],
            condition: ads[0].payload.val()['condition'],
            category: ads[0].payload.val()['category'],
            subCategory: ads[0].payload.val()['subCategory'],
            featured: ads[0].payload.val()['featured'],
            model: ads[0].payload.val()['model'],
            price: ads[0].payload.val()['price'],
            imageUrl: ads[0].payload.val()['imageUrl'],
            creator: ads[0].payload.val()['creator']
          };

          this.categoriesService.getCategoryNameById(ads[0].payload.val()['category'], false)
            .subscribe((cats) => {
              this.ad['categoryName'] = cats[0].payload.val()['name'];
            });

          this.categoriesService.getCategoryNameById(ads[0].payload.val()['subCategory'], true)
            .subscribe((cats) => {
              this.ad['subCategoryName'] = cats[0].payload.val()['name'];
            });

          this.authService.getUserDisplayName(ads[0].payload.val()['creator'])
            .subscribe((name) => {
              this.ad['creatorUserName'] = name;
            });

          if (this.authService.isAuthenticated()) {
            this.isCreator = this.auth.auth.currentUser.uid === ads[0].payload.val()['creator'];
          }

        }
      });
  }
}
