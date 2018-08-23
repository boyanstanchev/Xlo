import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {NavigationComponent} from './components/navigation/navigation.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {LoginComponent} from './components/authentication/login/login.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {AppRoutingModule} from './routing.module';
import {FeaturedComponent} from './components/ads/featured/featured.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './core/interceptors/token.interceptor';
import {AddComponent} from './components/ads/add/add.component';
import {AuthService} from './core/services/auth.service';
import {AdsService} from './core/services/ads.service';
import {CategoriesService} from './core/services/categories.service';
import {CategoryComponent} from './components/categories/category/category.component';
import {SubCategoryComponent} from './components/categories/sub-category/sub-category.component';
import {DetailsComponent} from './components/ads/details/details.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    FeaturedComponent,
    AddComponent,
    CategoryComponent,
    SubCategoryComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
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
