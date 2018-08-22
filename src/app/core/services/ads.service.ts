import {Injectable} from "@angular/core"
import {ToastrService} from "ngx-toastr"
import {Router} from "@angular/router"
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CategoriesModel} from '../models/categories.model';
import {AdsModel} from '../models/ads.model';

const BASE_URL: string = 'https://xlo-exam.firebaseio.com/obiavi'

@Injectable({
  providedIn: 'root'
})

export class AdsService {
  constructor(private toastr: ToastrService,
              private router: Router,
              private http: HttpClient) {}

  getFeaturedAds() {
    return this.http.get(`${BASE_URL}.json`)
      .pipe(map((res: Response) => {
        const ids = Object.keys(res)
        const featuredAds: AdsModel[] = []
        for (const i of ids) {
          featuredAds.push(new AdsModel(i, res[i].category, res[i].description, res[i].featured, res[i].imageUrl, res[i].model, res[i].price, res[i].subCategory, res[i].title))
        }

        return featuredAds.filter((ad) => {
          return ad.featured == 'true'
        })
      }))
  }
}
