import {AdsService} from './services/ads.service';
import {AuthService} from './services/auth.service';
import {CategoriesService} from './services/categories.service';
import {MessagesService} from './services/messages.service';
import {ShoppingCartService} from './services/shopping-cart.service';
import {ModalService} from '../components/shared/modal/modal.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token.interceptor';

export const coreServices = [
  AdsService,
  AuthService,
  CategoriesService,
  MessagesService,
  ShoppingCartService,
  ModalService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
]
