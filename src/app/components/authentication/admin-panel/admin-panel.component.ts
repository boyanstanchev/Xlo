import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../../core/services/categories.service';
import {AdsService} from '../../../core/services/ads.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: []
})
export class AdminPanelComponent implements OnInit {
  categories

  constructor(private categoriesService: CategoriesService,
              private adsService: AdsService) {
  }

  addCategory(form) {
    this.categoriesService.addCategory(form.value.category)
  }

  addSubCategory(form) {
    this.categoriesService.addSubCategory(form.value.subCategory, form.value.category)
  }

  deleteAd(form) {
    this.adsService.deleteAd(form.value.adId)
  }

  ngOnInit() {
    this.categories = this.categoriesService.getAllCategories()
  }

}
