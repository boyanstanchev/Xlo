import { Component, OnInit } from '@angular/core';
import {AdsService} from '../../../core/services/ads.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: []
})
export class FeaturedComponent implements OnInit {

  constructor(private adsService: AdsService) { }

  ngOnInit() {
    this.adsService.getFeaturedAds()
      .subscribe((data) => {
        console.log(data);
      })
  }

}
