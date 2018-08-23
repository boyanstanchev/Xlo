import {Component, OnInit} from '@angular/core';
import {AdsService} from '../../../core/services/ads.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: []
})
export class SubCategoryComponent implements OnInit {
  ads = [];

  constructor(private adsService: AdsService,
              private route: ActivatedRoute,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.ads = this.adsService.getAdsBySubCategoryId(this.route.snapshot.params['id'])
  }

}
