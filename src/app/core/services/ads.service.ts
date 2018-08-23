import {Injectable} from "@angular/core"
import {ToastrService} from "ngx-toastr"
import {Router} from "@angular/router"
import * as firebase from 'firebase';
import {AdCreateInterface} from '../models/ad.create.interface';
import DataSnapshot = firebase.database.DataSnapshot;

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
            "condition": child.val().condition,
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
    const adsRef = firebase.database().ref('obiavi')
    let newStoreRef = adsRef.push()
    newStoreRef.set(object)
      .then(() => {
        this.toastr.success('Your Ad is successfully added.')
        this.router.navigate(['/'])
      })
      .catch((err) => {
        this.toastr.error(err.message)
      })
  }

  getAdsByCategoryId(categoryId: string) {
    const adsRef = firebase.database().ref('obiavi')
    let ads = []
    adsRef.once("value")
      .then((snapshot) => {
        snapshot.forEach((child) => {
          if (child.val().category === categoryId) {
            ads.push({
              "id": child.key,
              "imageUrl": child.val().imageUrl,
              "price": child.val().price,
              "title": child.val().title
            })
          }
        })
      })
    return ads
  }
}
