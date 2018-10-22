import {Component, OnInit} from '@angular/core';
import {AdsService} from '../../../core/services/ads.service';
import {AuthService} from '../../../core/services/auth.service';
import {ModalService} from '../../shared/modal/modal.service';
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
        this.ads = ads
      })
  }
}
