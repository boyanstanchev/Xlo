import {Route, RouterModule} from '@angular/router';
import {LoginComponent} from './components/authentication/login/login.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {NgModule} from '@angular/core';
import {FeaturedComponent} from './components/ads/featured/featured.component';

const routes: Route[] = [
  {path: '', component: FeaturedComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
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
