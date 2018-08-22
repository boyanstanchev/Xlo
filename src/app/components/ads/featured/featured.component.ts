import { Component, OnInit } from '@angular/core'
import {AdsService} from '../../../core/services/ads.service'
import {AuthService} from '../../../core/services/auth.service'

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: []
})
export class FeaturedComponent implements OnInit {
  featuredAds = []

  constructor(private adsService: AdsService,
              public authService: AuthService) { }

  ngOnInit() {
    this.featuredAds = this.adsService.getFeaturedAds() //filter the arr somehow!
  }

}
