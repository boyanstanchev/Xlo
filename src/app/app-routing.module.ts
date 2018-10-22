import {Route, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CategoryComponent} from './components/categories/category/category.component';
import {SubCategoryComponent} from './components/categories/sub-category/sub-category.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {AdsModule} from './components/ads/ads.module';
import {AuthenticationModule} from './components/authentication/authentication.module';
import {AuthGuard} from './core/guards/auth.guard';

const routes: Route[] = [
  {path: '', redirectTo: '/ads/featured', pathMatch: 'full'},

  {path: 'category/:id', component: CategoryComponent},
  {path: 'sub-category/:id', component: SubCategoryComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},

  {path: 'profile', loadChildren: () => AuthenticationModule},
  {path: 'ads', loadChildren: () => AdsModule}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
