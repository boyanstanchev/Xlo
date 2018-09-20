import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoriesModel} from '../../../core/models/categories.model';
import {CategoriesService} from '../../../core/services/categories.service';
import {NgForm} from '@angular/forms';
import {AdsService} from '../../../core/services/ads.service';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: []
})
export class AddComponent implements OnInit {
  categories: CategoriesModel[] = [];
  subCategories = [];

  constructor(private categoriesService: CategoriesService,
              private adsService: AdsService,
              private authService: AuthService) {
  }

  add(form: NgForm) {
    this.adsService.createAd({
      title: form.value.title,
      condition: form.value.condition,
      category: form.value.category,
      subCategory: form.value.subCategory,
      featured: form.value.featured || false,
      model: form.value.model,
      price: form.value.price,
      imageUrl: form.value.imageUrl,
      creator: this.authService.userId
    });
  }

  loadSubCategories(event) {
    this.subCategories = this.categoriesService.getSubCategories(event.target.value);
  }

  ngOnInit() {
    this.categoriesService.getAllCategories().subscribe((cats) => {
      cats.forEach((cat) => {
        this.categories.push(new CategoriesModel(cat.key, cat.payload.val()['name']))
      });
    });
  }

}
