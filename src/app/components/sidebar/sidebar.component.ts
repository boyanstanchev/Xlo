import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../core/services/categories.service';
import {CategoriesModel} from '../../core/models/categories.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories: Array<CategoriesModel> = [];

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categoriesService.getAllCategories()
      .subscribe((cats) => {
        this.categories = [];
        cats.forEach((cat) => {
          this.categories.push(new CategoriesModel(cat.key, cat.payload.val()['name']));
        });
      });
  }

}
