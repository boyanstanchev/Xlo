import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../../core/services/categories.service';
import {Observable} from 'rxjs';
import {SubCategoriesModel} from '../../../core/models/subCategories.model';
import {AdsService} from '../../../core/services/ads.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: []
})
export class CategoryComponent implements OnInit {
  subCategories = []
  ads = []
  navigationSubscription

  constructor(private categoriesService: CategoriesService,
              private adsService: AdsService,
              private route: ActivatedRoute,
              private router: Router,
              public authService: AuthService) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {

      if (e instanceof NavigationEnd) {
        this.ngOnInit()
      }
    });
  }


  ngOnInit() {
    this.subCategories = this.categoriesService.getSubCategories(this.route.snapshot.params['id'])
    this.ads = this.adsService.getAdsByCategoryId(this.route.snapshot.params['id'])
  }

}
