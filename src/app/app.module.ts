import {NgModule} from '@angular/core';
// Modules
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {AppRoutingModule} from './app-routing.module';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
import {AuthenticationModule} from './components/authentication/authentication.module';
import {CategoriesModule} from './components/categories/categories.module';
import {SharedModule} from './components/shared/shared.module';
import {AdsModule} from './components/ads/ads.module';
import {CoreModule} from './core/core.module';

// Components
import {AppComponent} from './app.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {TokenInterceptor} from './core/interceptors/token.interceptor';
import {CheckoutComponent} from './components/checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidebarComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule,
    CategoriesModule,
    SharedModule,
    AdsModule,
    CoreModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
