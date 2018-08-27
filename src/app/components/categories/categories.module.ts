import {NgModule} from '@angular/core';
import {categoriesComponents} from './index';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../../routing.module';
import {AuthService} from '../../core/services/auth.service';
import {AdsService} from '../../core/services/ads.service';
import {CategoriesService} from '../../core/services/categories.service';
import {ModalService} from '../shared/modal/modal.service';
import {MessagesService} from '../../core/services/messages.service';
import {ShoppingCartService} from '../../core/services/shopping-cart.service';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ...categoriesComponents
  ],
  imports: [
    FormsModule,
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    AuthService,
    AdsService,
    CategoriesService,
    ModalService,
    MessagesService,
    ShoppingCartService
  ]
})

export class CategoriesModule {}
