import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private toastr: ToastrService,
              private db: AngularFireDatabase) {
  }

  getAllCategories() {
    return this.db.list('categories').snapshotChanges();
  }

  getSubCategories(categoryId): Array<any> {
    let subCategories = [];
    this.db.list('subCategories').snapshotChanges()
      .subscribe((subCats) => {
        subCats.forEach((cat) => {
          if (cat.payload.val()['category'] === categoryId) {
            subCategories.push({
              'id': cat.key,
              'name': cat.payload.val()['name']
            });
          }
        });
      });
    return subCategories;
  }

  getCategoryNameById(categoryId: string, subCategory: boolean) {
    return subCategory ? this.db.list('subCategories', ref => ref.orderByKey().equalTo(categoryId)).snapshotChanges() : this.db.list('categories', ref => ref.orderByKey().equalTo(categoryId)).snapshotChanges()
  }

  addCategory(categoryName: string) {
    const catsRef = this.db.list('categories');
    const promise = catsRef.push({name: categoryName});
    promise
      .then(() => {
        this.toastr.success('Category added successfully.');
      });
  }

  addSubCategory(subCategoryName: string, categoryId: string) {
    const catsRef = this.db.list('subCategories');
    const promise = catsRef.push({
      name: subCategoryName,
      category: categoryId
    });
    promise
      .then(() => {
        this.toastr.success('Sub-Category added successfully.');
      });
  }

}
