import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {AdCreateInterface} from '../models/ad.create.interface';

@Injectable({
  providedIn: 'root'
})

export class AdsService {
  constructor(private toastr: ToastrService,
              private router: Router) {
  }

  getFeaturedAds() {
    let adsRef = firebase.database().ref('obiavi');
    let featuredAds = [];
    adsRef.once('value')
      .then((snapshot) => {
        snapshot.forEach((child) => {
          if (child.val().featured == true) {
            let isCreator = false
            if (firebase.auth().currentUser && firebase.auth().currentUser.uid == child.val().creator) {
              isCreator = true
            }

            featuredAds.push({
              'id': child.key,
              'imageUrl': child.val().imageUrl,
              'price': child.val().price,
              'title': child.val().title,
              'condition': child.val().condition,
              'creator': child.val().creator,
              isCreator
            });
          }
        });
      });
    return featuredAds;
  }

  createAd(object: AdCreateInterface) {
    const adsRef = firebase.database().ref('obiavi');
    let newStoreRef = adsRef.push();
    newStoreRef.set(object)
      .then(() => {
        this.toastr.success('Your Ad is successfully added.');
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }

  getAdsByCategoryId(categoryId: string) {
    const adsRef = firebase.database().ref('obiavi');
    let ads = [];
    adsRef.once('value')
      .then((snapshot) => {
        snapshot.forEach((child) => {
          if (child.val().category === categoryId) {
            let isCreator = false
            if (firebase.auth().currentUser && firebase.auth().currentUser.uid == child.val().creator) {
              isCreator = true
            }

            ads.push({
              'id': child.key,
              'imageUrl': child.val().imageUrl,
              'price': child.val().price,
              'title': child.val().title,
              'condition': child.val().condition,
              'creator': child.val().creator,
              isCreator
            });
          }
        });
      });
    return ads;
  }

  getAdsBySubCategoryId(subCategoryId: string) {
    const adsRef = firebase.database().ref('obiavi');
    let ads = [];
    adsRef.once('value')
      .then((snapshot) => {
        snapshot.forEach((child) => {
          if (child.val().subCategory === subCategoryId) {
            let isCreator = false
            if (firebase.auth().currentUser && firebase.auth().currentUser.uid == child.val().creator) {
              isCreator = true
            }

            ads.push({
              'id': child.key,
              'imageUrl': child.val().imageUrl,
              'price': child.val().price,
              'title': child.val().title,
              'condition': child.val().condition,
              'creator': child.val().creator,
              isCreator
            });
          }
        });
      });
    return ads;
  }

  getAdById(adId: string) {
    let adsRef = firebase.database().ref(`obiavi/${adId}`), ad;
    return adsRef.once('value')
      .then((snapshot) => {
        ad = snapshot;
        return ad;
      });
  }

  editAdById(adId: string, body) {
    firebase.database().ref(`obiavi/${adId}`).set(body, (err) => {
      if (err) {
        this.toastr.error(err.message);
      }
    })
      .then(() => {
        this.toastr.success('Ad edited.');
        this.router.navigate([`/ads/${adId}`]);
      });
  }

  getAdsByUserId(userId: string) {
    let dbRef = firebase.database().ref();
    let peep;
    return dbRef.child('obiavi')
      .orderByChild('creator')
      .equalTo(userId)
      .once('value')
      .then((snapshot) => {
        peep = snapshot;
        return peep;
      });
  }

  deleteAd(adId: string) {
    let adsRef = firebase.database().ref(`obiavi/${adId}`);
    adsRef.remove()
      .then(() => {
        this.toastr.success('Ad deleted.')
      })
      .catch((err) => {
        this.toastr.error(err.message)
      })
  }

}
