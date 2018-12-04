import {Observable} from 'rxjs'
import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {AuthService} from '../../../core/services/auth.service'
import {AdsService} from '../../../core/services/ads.service'
import {ModalService} from '../../shared/modal/modal.service'
import {MessagesService} from '../../../core/services/messages.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: []
})
export class ProfileComponent implements OnInit {
  userName: Observable<any>
  userAds: Array<any>

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private adsService: AdsService,
              public modalService: ModalService,
              public messagesService: MessagesService) {
  }

  ngOnInit() {
    this.userName = this.authService.getUserDisplayName(this.route.snapshot.params['id'])
    this.adsService.getAdsByUserId(this.route.snapshot.params['id']).subscribe(ads => this.userAds = ads)
  }

}
