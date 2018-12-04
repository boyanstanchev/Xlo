import {Injectable} from '@angular/core'
import {ToastrService} from 'ngx-toastr'
import {AngularFireDatabase} from 'angularfire2/database'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private toastr: ToastrService,
              private db: AngularFireDatabase) {
  }

  getAllCategories() {
    return this.db.list('categories').snapshotChanges()
  }

  getSubCategories(categoryId): Observable<any> {
    return this.db.list('subCategories').snapshotChanges().pipe(map((subCategories) => {
      return subCategories.filter(c => c.payload.val()['category'] === categoryId)
    }))
  }

  getCategoryNameById(categoryId: string, subCategory: boolean) {
    return subCategory ? this.db.list('subCategories', ref => ref.orderByKey().equalTo(categoryId).limitToFirst(1)).snapshotChanges() : this.db.list('categories', ref => ref.orderByKey().equalTo(categoryId).limitToFirst(1)).snapshotChanges()
  }

  addCategory(categoryName: string) {
    const catsRef = this.db.list('categories')
    const promise = catsRef.push({name: categoryName})
    promise
      .then(() => {
        this.toastr.success('Category added successfully.')
      })
  }

  addSubCategory(subCategoryName: string, categoryId: string) {
    const catsRef = this.db.list('subCategories')
    const promise = catsRef.push({
      name: subCategoryName,
      category: categoryId
    })
    promise
      .then(() => {
        this.toastr.success('Sub-Category added successfully.')
      })
  }

}
