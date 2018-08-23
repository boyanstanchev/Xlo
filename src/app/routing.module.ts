import {Route, RouterModule} from '@angular/router';
import {LoginComponent} from './components/authentication/login/login.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {NgModule} from '@angular/core';
import {FeaturedComponent} from './components/ads/featured/featured.component';
import {AddComponent} from './components/ads/add/add.component';
import {CategoryComponent} from './components/categories/category/category.component';
import {SubCategoryComponent} from './components/categories/sub-category/sub-category.component';
import {DetailsComponent} from './components/ads/details/details.component';

const routes: Route[] = [
  {path: '', component: FeaturedComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'sub-category/:id', component: SubCategoryComponent},
  {
    path: 'ads', children: [
      {path: 'add', component: AddComponent},
      {path: ':id', component: DetailsComponent}
    ]
  },
  {
    path: 'category', children: [
      {path: ':id', component: CategoryComponent}
    ], runGuardsAndResolvers: 'always'
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
