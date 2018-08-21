import {Route, RouterModule} from '@angular/router';
import {LoginComponent} from './components/authentication/login/login.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {NgModule} from '@angular/core';
import {FeaturedComponent} from './components/ads/featured/featured.component';
import {AddComponent} from './components/ads/add/add.component';

const routes: Route[] = [
  {path: '', component: FeaturedComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'ads', children: [
      {path: 'add', component: AddComponent}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
