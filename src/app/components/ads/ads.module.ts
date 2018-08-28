import {NgModule} from '@angular/core';
import {adsComponents} from './index';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AdsService} from '../../core/services/ads.service';
import {AuthService} from '../../core/services/auth.service';
import {ShoppingCartService} from '../../core/services/shopping-cart.service';
import {ModalService} from '../shared/modal/modal.service';
import {MessagesService} from '../../core/services/messages.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {AdsRoutingModule} from './ads-routing.module';

@NgModule({
  declarations: [
    ...adsComponents
  ],
  imports: [
    FormsModule,
    CommonModule,
    AdsRoutingModule,
    SharedModule,
    NgxPaginationModule
  ],
  providers: [
    AdsService,
    AuthService,
    ShoppingCartService,
    ModalService,
    MessagesService
  ],
  exports: [
    CommonModule
  ]
})

export class AdsModule {}
