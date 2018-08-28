import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {authenticationComponents} from './index';

import {AuthService} from '../../core/services/auth.service';
import {AdsService} from '../../core/services/ads.service';
import {ModalService} from '../shared/modal/modal.service';
import {MessagesService} from '../../core/services/messages.service';
import {CategoriesService} from '../../core/services/categories.service';
import {SharedModule} from '../shared/shared.module';
import {AuthenticationRoutingModule} from './authentication-routing.module';

@NgModule({
  declarations: [
    ...authenticationComponents
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule
  ],
  providers: [
    AuthService,
    AdsService,
    ModalService,
    MessagesService,
    CategoriesService
  ]
})

export class AuthenticationModule {}
