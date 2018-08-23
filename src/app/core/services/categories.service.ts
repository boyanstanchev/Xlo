import {Injectable} from "@angular/core"
import * as firebase from "firebase"
import {ToastrService} from "ngx-toastr"
import {Router} from "@angular/router"
import {HttpClient} from '@angular/common/http';
import {CategoriesModel} from '../models/categories.model';
import {map} from 'rxjs/operators';
import {SubCategoriesModel} from '../models/subCategories.model';

const BASE_URL = 'https://xlo-exam.firebaseio.com/categories'
const SUB_URL = 'https://xlo-exam.firebaseio.com/subCategories'

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

  getSubCategories(categoryId) {
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
    return subCategories
  }

}
