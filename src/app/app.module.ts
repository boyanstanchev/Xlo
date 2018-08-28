import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {NavigationComponent} from './components/navigation/navigation.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './core/interceptors/token.interceptor';
import {AuthService} from './core/services/auth.service';
import {AdsService} from './core/services/ads.service';
import {CategoriesService} from './core/services/categories.service';
import {ModalService} from './components/shared/modal/modal.service';
import {ShoppingCartService} from './core/services/shopping-cart.service';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {AuthenticationModule} from './components/authentication/authentication.module';
import {MessagesService} from './core/services/messages.service';
import {CategoriesModule} from './components/categories/categories.module';
import {SharedModule} from './components/shared/shared.module';
import {AdsModule} from './components/ads/ads.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidebarComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule,
    CategoriesModule,
    SharedModule,
    AdsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  providers: [
    AuthService,
    AdsService,
    CategoriesService,
    ModalService,
    ShoppingCartService,
    MessagesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
