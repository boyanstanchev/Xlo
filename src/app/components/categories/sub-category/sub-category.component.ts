import {Component, OnInit} from '@angular/core';
import {AdsService} from '../../../core/services/ads.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {CategoriesService} from '../../../core/services/categories.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: []
})
export class SubCategoryComponent implements OnInit {
  ads = [];
  catName

  constructor(private adsService: AdsService,
              private route: ActivatedRoute,
              public authService: AuthService,
              private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.ads = this.adsService.getAdsBySubCategoryId(this.route.snapshot.params['id'])
    this.categoriesService.getCategoryNameById(this.route.snapshot.params['id'], true)
      .then((snapshot) => {
        this.catName = snapshot.val().name
      })
  }

}
