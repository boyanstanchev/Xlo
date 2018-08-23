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

const routes: Route[] = [
  {path: '', component: FeaturedComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'category/:id', component: CategoryComponent, runGuardsAndResolvers: 'always'},
  {path: 'sub-category/:id', component: SubCategoryComponent},
  {path: 'profile', children: [
      {path: ':id', component: ProfileComponent},
      {path: 'me', component: MyProfileComponent}
    ]
  },
  {
    path: 'ads', children: [
      {path: ':id', component: DetailsComponent},
      {path: 'add', component: AddComponent}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
