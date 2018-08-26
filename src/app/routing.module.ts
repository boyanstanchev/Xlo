import {Route, RouterModule} from '@angular/router';
import {LoginComponent} from './components/authentication/login/login.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {NgModule} from '@angular/core';
import {FeaturedComponent} from './components/ads/featured/featured.component';
import {AddComponent} from './components/ads/add/add.component';
import {CategoryComponent} from './components/categories/category/category.component';
import {SubCategoryComponent} from './components/categories/sub-category/sub-category.component';
import {DetailsComponent} from './components/ads/details/details.component';
import {ProfileComponent} from './components/authentication/profile/profile.component';
import {MyProfileComponent} from './components/authentication/my-profile/my-profile.component';
import {EditComponent} from './components/ads/edit/edit.component';
import {AuthGuard} from './core/guards/auth.guard';
import {AdminPanelComponent} from './components/authentication/admin-panel/admin-panel.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {AdminGuard} from './core/guards/admin.guard';

const routes: Route[] = [
  {path: '', component: FeaturedComponent},
  {path: 'login', component: LoginComponent, runGuardsAndResolvers: 'always'},
  {path: 'register', component: RegisterComponent},
  {path: 'category/:id', component: CategoryComponent},
  {path: 'sub-category/:id', component: SubCategoryComponent},
  {path: 'admin', component: AdminPanelComponent}, //, canActivate: [AdminGuard]
  {path: 'checkout', component: CheckoutComponent},
  {
    path: 'profile', children: [
      {path: 'me', component: MyProfileComponent, canActivate: [AuthGuard]},
      {path: ':id', component: ProfileComponent},
    ]
  },
  {
    path: 'ads', children: [
      {path: 'add', component: AddComponent, canActivate: [AuthGuard]},
      {path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard]},
      {path: ':id', component: DetailsComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
