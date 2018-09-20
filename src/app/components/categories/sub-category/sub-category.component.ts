import {Component, OnInit} from '@angular/core';
import {AdsService} from '../../../core/services/ads.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {CategoriesService} from '../../../core/services/categories.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: []
})
export class SubCategoryComponent implements OnInit {
  ads = [];
  catName: string

  constructor(private adsService: AdsService,
              private route: ActivatedRoute,
              public authService: AuthService,
              private categoriesService: CategoriesService,
              private toastr: ToastrService) {
  }

  addToCart(adTitle: string, adId: string) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems'))
    if (cartItems) {
      cartItems[adId] = adTitle
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems))
    } else {
      let data = {}
      data[adId] = adTitle
      sessionStorage.setItem('cartItems', JSON.stringify(data))
    }
    this.toastr.success('Item had been added to your cart.')
  }

  ngOnInit() {
    this.ads = this.adsService.getAdsBySubCategoryId(this.route.snapshot.params['id'])
    this.categoriesService.getCategoryNameById(this.route.snapshot.params['id'], true)
      .subscribe((cats) => {
        cats.forEach((cat) => {
          this.catName = cat.payload.val()['name'];
        });
      });
  }

}
