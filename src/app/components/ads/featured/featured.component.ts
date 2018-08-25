import {Component, OnInit} from '@angular/core';
import {AdsService} from '../../../core/services/ads.service';
import {AuthService} from '../../../core/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ShoppingCartService} from '../../../core/services/shopping-cart.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: []
})
export class FeaturedComponent implements OnInit {
  featuredAds = [];

  constructor(private adsService: AdsService,
              public authService: AuthService,
              private cartService: ShoppingCartService) {
  }

  addToCart(adTitle: string, adId: string, adPrice: string) {
    this.cartService.add(adTitle, adId, adPrice)
  }

  ngOnInit() {
    this.featuredAds = this.adsService.getFeaturedAds();
  }

}
