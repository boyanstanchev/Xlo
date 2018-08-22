import {Injectable} from "@angular/core"
import {ToastrService} from "ngx-toastr"
import {Router} from "@angular/router"
import {HttpClient} from '@angular/common/http';
import {AdsModel} from '../models/ads.model';
import * as firebase from 'firebase';
import {AdCreateInterface} from '../models/ad.create.interface';

@Injectable({
  providedIn: 'root'
})

export class AdsService {
  constructor(private toastr: ToastrService,
              private router: Router) {}

  getFeaturedAds() {
    let adsRef = firebase.database().ref('obiavi')
    let featuredAds= []
    adsRef.once("value")
      .then((snapshot) => {
        snapshot.forEach((child) => {
          featuredAds.push({
            "id": child.key,
            "category": child.val().category,
            "description": child.val().description,
            "featured": child.val().featured,
            "imageUrl": child.val().imageUrl,
            "model": child.val().model,
            "price": child.val().price,
            "subCategory": child.val().subCategory,
            "title": child.val().title
          })
        })
      })
    return featuredAds
  }

  createAd(object: AdCreateInterface) {
    let adsRef = firebase.database().ref('obiavi')
    let newStoreRef = adsRef.push()
    newStoreRef.set(object)
      .then(() => {
        this.toastr.success('Your ad is successfully added.')
        this.router.navigate(['/'])
      })
      .catch((err) => {
        this.toastr.error(err.message)
      })
  }
}
