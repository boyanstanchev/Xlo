import { CategoriesService } from './categories.service';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Ad} from '../models/ad';
import {AngularFireDatabase} from 'angularfire2/database';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdsService {
  constructor(private toastr: ToastrService,
              private router: Router,
              private db: AngularFireDatabase,
              private authService: AuthService,
              private categoriesService: CategoriesService) { }

  getFeaturedAds(): Observable<any> {
    let adsRef = this.db.list('obiavi', ref => ref.orderByChild('featured').equalTo(true)).snapshotChanges();

    return adsRef.pipe(map((ads: Array<any>) => {
      ads.forEach((ad) => {
        let isCreator = false;

        if (this.authService.user && this.authService.user.uid == ad.payload.val()['creator']) {
          isCreator = true;
        }

        ad['isCreator'] = isCreator;
      });

      return ads
    }));
  }

  createAd(ad: Ad) {
    const adsRef = this.db.list('obiavi');
    const promise = adsRef.push(ad);
    promise.then(() => {
      this.toastr.success('Your Ad is successfully added.');
      this.router.navigate(['/ads/featured']);
    });
  }

  getAdsByCategoryId(categoryId: string, subCategory: boolean = false): Observable<any> {
    let dbRef = this.db.list('obiavi', ref => ref.orderByChild('category').equalTo(categoryId));

    if (subCategory) {
      dbRef = this.db.list('obiavi', ref => ref.orderByChild('subCategory').equalTo(categoryId));
    }

    return dbRef.snapshotChanges().pipe(map((ads) => {
      ads.forEach((ad) => {
        let isCreator = false;

        if (this.authService.user && this.authService.user.uid == ad.payload.val()['creator']) {
          isCreator = true;
        }

        ad['isCreator'] = isCreator
      });
      return ads
    }));
  }

  getAdById(adId: string) {
    return this.db.list('obiavi', ref => ref.orderByKey().equalTo(adId).limitToFirst(1)).valueChanges().pipe(map((ads: Array<Ad>) => {
      if (ads.length > 0) {
        this.categoriesService.getCategoryNameById(ads[0].category, false).subscribe((cats) => {
          ads[0].categoryName = cats[0].payload.val()['name'];
        });

        this.categoriesService.getCategoryNameById(ads[0].subCategory, true).subscribe((cats) => {
          ads[0].subCategoryName = cats[0].payload.val()['name'];
        });

        this.authService.getUserDisplayName(ads[0].creator).subscribe((name) => {
          ads[0].creatorUserName = name;
        });

        if (this.authService.isAuthenticated()) {
          ads[0].isCreator = this.authService.user.uid === ads[0].creator;
        }

        return ads[0]
      }
    }))
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
    return this.db.list('obiavi', ref => ref.orderByChild('creator').equalTo(userId)).snapshotChanges();
  }

  deleteAd(adId: string) {
    const adsRef = this.db.list('obiavi');
    adsRef.remove(adId)
      .then(() => {
        this.toastr.success('Ad deleted.');
      })
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }

}
