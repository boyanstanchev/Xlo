import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../../core/services/categories.service';
import {AdsService} from '../../../core/services/ads.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ModalService} from '../../modal/modal.service';
import {MessagesService} from '../../../core/services/messages.service';
import {ShoppingCartService} from '../../../core/services/shopping-cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: []
})
export class CategoryComponent implements OnInit {
  subCategories = []
  ads = []
  navigationSubscription
  categoryName

  constructor(private categoriesService: CategoriesService,
              private adsService: AdsService,
              private route: ActivatedRoute,
              private router: Router,
              public authService: AuthService,
              private toastr: ToastrService,
              private modalService: ModalService,
              private messagesService: MessagesService,
              private cartService: ShoppingCartService) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {

      if (e instanceof NavigationEnd) {
        this.ngOnInit()
      }
    });
  }

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
        this.closeModal('custom-modal-5')
      })
      .catch(err => this.toastr.error(err.message))
  }


  ngOnInit() {
    this.subCategories = this.categoriesService.getSubCategories(this.route.snapshot.params['id'])
    this.ads = this.adsService.getAdsByCategoryId(this.route.snapshot.params['id'])
    this.categoriesService.getCategoryNameById(this.route.snapshot.params['id'], false)
      .then((snapshot) => {
        this.categoryName = snapshot.val().name
      })

  }

}
