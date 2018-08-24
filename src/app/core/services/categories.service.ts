import {Injectable} from "@angular/core"
import * as firebase from "firebase"
import {ToastrService} from "ngx-toastr"
import {Router} from "@angular/router"
import {HttpClient} from '@angular/common/http';
import {CategoriesModel} from '../models/categories.model';
import {map} from 'rxjs/operators';

const BASE_URL = 'https://xlo-exam.firebaseio.com/categories'

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private toastr: ToastrService,
              private router: Router,
              private http: HttpClient) {}

  getAllCategories() {
    return this.http.get(`${BASE_URL}.json`)
      .pipe(map((res: Response) => {
        const ids = Object.keys(res)
        const categories: CategoriesModel[] = []
        for (const i of ids) {
          categories.push(new CategoriesModel(i, res[i].name))
        }

        return categories
      }))
  }

  getSubCategories(categoryId): Array<any> {
    const subCatsRef = firebase.database().ref('subCategories')
    let subCategories = []
    subCatsRef.once("value")
      .then((snapshot) => {
        snapshot.forEach((child) => {
          if (child.val().category === categoryId) {
            subCategories.push({
              "id": child.key,
              "name": child.val().name
            })
          }
        })
      })
      .catch(err => this.toastr.error(err.message))

    return subCategories
  }

  getCategoryNameById(categoryId: string, subCategory: boolean) {
      if (subCategory) {
        let subCatsRef = firebase.database().ref(`subCategories/${categoryId}`), category
        return subCatsRef.once('value')
          .then((snapshot) => {
            category = snapshot
            return category
          })
      } else {
        let subCatsRef = firebase.database().ref(`categories/${categoryId}`), category
        return subCatsRef.once('value')
          .then((snapshot) => {
            category = snapshot
            return category
          })
      }
  }

  addCategory(categoryName: string) {
    let catsRef = firebase.database().ref('categories')
    let newCatRef = catsRef.push()
    newCatRef.set({
      name: categoryName
    })
      .then(() => {
        this.toastr.success('Category added successfully.')
      })
      .catch((err) => {
        this.toastr.error(err.message)
      })
  }

  addSubCategory(subCategoryName: string, categoryId: string) {
    let catsRef = firebase.database().ref('subCategories')
    let newCatRef = catsRef.push()
    newCatRef.set({
      name: subCategoryName,
      category: categoryId
    })
      .then(() => {
        this.toastr.success('Sub-Category added successfully.')
      })
      .catch((err) => {
        this.toastr.error(err.message)
      })
  }

}
