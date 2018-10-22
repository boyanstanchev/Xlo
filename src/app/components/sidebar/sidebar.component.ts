import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../core/services/categories.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories: Array<any> = [];

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categoriesService.getAllCategories()
      .subscribe((cats: Array<any>) => {
        this.categories = cats
      });
  }

}
