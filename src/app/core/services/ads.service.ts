import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {AdCreateInterface} from '../models/ad.create.interface';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})

export class AdsService {
  constructor(private toastr: ToastrService,
              private router: Router,
              private db: AngularFireDatabase) {
  }

  getFeaturedAds() {
    return this.db.list('obiavi').snapshotChanges()
  }

  createAd(ad: AdCreateInterface) {
    const adsRef = this.db.list('obiavi');
    const promise = adsRef.push(ad);
    promise.then(() => {
        this.toastr.success('Your Ad is successfully added.');
        this.router.navigate(['/ads/featured']);
      });
  }

  getAdsByCategoryId(categoryId: string, subCategory: boolean = false) {
    let categoryAds: Array<any> = [];

    let dbRef = this.db.list('obiavi', ref => ref.orderByChild('category').equalTo(categoryId))

    if (subCategory) {
      dbRef = this.db.list('obiavi', ref => ref.orderByChild('subCategory').equalTo(categoryId))
    }

    dbRef.snapshotChanges()
      .subscribe((ads) => {
        ads.forEach((ad) => {
          let isCreator = false;
          if (firebase.auth().currentUser && firebase.auth().currentUser.uid == ad.payload.val()['creator']) {
            isCreator = true;
          }

          categoryAds.push({
            'id': ad.key,
            'imageUrl': ad.payload.val()['imageUrl'],
            'price': ad.payload.val()['price'],
            'title': ad.payload.val()['title'],
            'condition': ad.payload.val()['condition'],
            'creator': ad.payload.val()['creator'],
            isCreator
          });
        });
      });
    return categoryAds;
  }

  getAdById(adId: string) {
    return this.db.list('obiavi', ref => ref.orderByKey().equalTo(adId)).snapshotChanges()
  }

  editAdById(adId: string, model) {
    const adsRef = this.db.list('obiavi');
    adsRef.update(adId, {
      title: model.title,
      model: model.model,
      price: model.price,
      imageUrl: model.imageUrl
    })
      .then(() => {
        this.toastr.success('Ad edited.');
        this.router.navigate([`/ads/${adId}`]);
      });
  }

  getAdsByUserId(userId: string) {
    return this.db.list('obiavi', ref => ref.orderByChild('creator').equalTo(userId)).snapshotChanges()
  }

  deleteAd(adId: string) {
    const adsRef = this.db.list('obiavi')
    adsRef.remove(adId)
      .then(() => {
        this.toastr.success('Ad deleted.');
      })
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }

}
