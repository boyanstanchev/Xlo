import { Component, OnInit } from '@angular/core';
import {AdsService} from '../../../core/services/ads.service';
import {Observable} from 'rxjs';
import {AdsModel} from '../../../core/models/ads.model';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: []
})
export class FeaturedComponent implements OnInit {
  featuredAds: Observable<AdsModel[]>

  constructor(private adsService: AdsService,
              public authService: AuthService) { }

  ngOnInit() {
    this.featuredAds = this.adsService.getFeaturedAds()
  }

}
