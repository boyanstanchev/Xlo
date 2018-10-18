import {Component, OnInit} from '@angular/core';
import {AdsService} from '../../../core/services/ads.service';
import {AuthService} from '../../../core/services/auth.service';
import {ModalService} from '../../shared/modal/modal.service';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: []
})
export class FeaturedComponent implements OnInit {
  ads: Array<any> = []

  constructor(private adsService: AdsService,
              public authService: AuthService,
              public modalService: ModalService,
              public auth: AngularFireAuth) {}


  ngOnInit() {
    this.adsService.getFeaturedAds()
      .subscribe((ads) => {
        this.ads = []
        ads.forEach((ad) => {
          if (ad.payload.val()['featured']) {
            let isCreator = false;
            if (firebase.auth().currentUser && firebase.auth().currentUser.uid == ad.payload.val()['creator']) {
              isCreator = true;
            }
            this.ads.push({
              'id': ad.key,
              'imageUrl': ad.payload.val()['imageUrl'],
              'price': ad.payload.val()['price'],
              'title': ad.payload.val()['title'],
              'condition': ad.payload.val()['condition'],
              'creator': ad.payload.val()['creator'],
              isCreator
            })
          }
        })
      })
  }
}
