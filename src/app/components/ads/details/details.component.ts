import {AuthService} from './../../../core/services/auth.service';
import {Ad} from './../../../core/models/ad';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdsService} from '../../../core/services/ads.service';
import {ModalService} from '../../shared/modal/modal.service';
import {MessagesService} from '../../../core/services/messages.service';
import {ShoppingCartService} from '../../../core/services/shopping-cart.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: []
})
export class DetailsComponent implements OnInit {
  ad: Ad

  constructor(private route: ActivatedRoute,
              private adsService: AdsService,
              public modalService: ModalService,
              public messagesService: MessagesService,
              public cartService: ShoppingCartService,
              public authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.adsService.getAdById(this.route.snapshot.params['id']).subscribe((ad) => {
      if (ad) {
        ad.id = this.route.snapshot.params['id']
        this.ad = ad
      } else {
        this.toastr.error('Cannot find AD with such ID.')
      }
    })
  }
}
