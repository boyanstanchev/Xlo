import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../../core/services/categories.service';
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
  categoryName

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
    this.categoriesService.getCategoryNameById(this.route.snapshot.params['id'], false)
      .then((snapshot) => {
        this.categoryName = snapshot.val().name
      })

  }

}
