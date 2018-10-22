import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../../core/services/categories.service';
import {NgForm} from '@angular/forms';
import {AdsService} from '../../../core/services/ads.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: []
})
export class AddComponent implements OnInit {
  categories: Array<any> = [];
  subCategories = [];

  constructor(private categoriesService: CategoriesService,
              private adsService: AdsService,
              private auth: AngularFireAuth) {
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
      creator: this.auth.auth.currentUser.uid
    });
  }

  loadSubCategories(event) {
    this.categoriesService.getSubCategories(event.target.value)
      .subscribe((subCategories) => {
        this.subCategories = subCategories
      })
  }

  ngOnInit() {
    this.categoriesService.getAllCategories().subscribe((cats) => {
      this.categories = cats
    });
  }

}
