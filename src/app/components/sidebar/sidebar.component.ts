import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../core/services/categories.service';
import {CategoriesModel} from '../../core/models/categories.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories: Observable<CategoriesModel[]>

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categories = this.categoriesService.getAllCategories()
  }

}
