import {Component, OnInit} from '@angular/core';
import {AdsService} from '../../../core/services/ads.service';
import {AuthService} from '../../../core/services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: []
})
export class FeaturedComponent implements OnInit {
  featuredAds = [];

  constructor(private adsService: AdsService,
              public authService: AuthService,
              private toastr: ToastrService) {
  }

  addToCart(adTitle: string, adId: string, adPrice: string) {
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
    this.featuredAds = this.adsService.getFeaturedAds();
  }

}
