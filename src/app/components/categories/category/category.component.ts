import {Component, OnInit} from '@angular/core'
import {CategoriesService} from '../../../core/services/categories.service'
import {AdsService} from '../../../core/services/ads.service'
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'
import {AuthService} from '../../../core/services/auth.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: []
})
export class CategoryComponent implements OnInit {
  subCategories = []
  ads = []
  navigationSubscription
  categoryName: string

  constructor(private categoriesService: CategoriesService,
              private adsService: AdsService,
              private route: ActivatedRoute,
              private router: Router,
              public authService: AuthService) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {

      if (e instanceof NavigationEnd) {
        this.ngOnInit()
      }
    })
  }

  ngOnInit() {
    this.categoriesService.getSubCategories(this.route.snapshot.params['id'])
      .subscribe((subCategories) => {
        this.subCategories = subCategories
      })

    this.adsService.getAdsByCategoryId(this.route.snapshot.params['id'])
      .subscribe((ads) => {
        this.ads = ads
      })

    this.categoriesService.getCategoryNameById(this.route.snapshot.params['id'], false)
      .subscribe((cats) => {
        this.categoryName = cats[0].payload.val()['name']
      })
  }

}
