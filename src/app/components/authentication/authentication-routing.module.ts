import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../core/guards/auth.guard';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {ProfileComponent} from './profile/profile.component';

const authenticationRoutes: Routes = [
  {path: 'login', component: LoginComponent, runGuardsAndResolvers: 'always'},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminPanelComponent}, //TODO: canActivate: [AdminGuard]
  {path: 'me', component: MyProfileComponent, canActivate: [AuthGuard]},
  {path: ':id', component: ProfileComponent},
]

@NgModule({
  imports: [
    RouterModule.forChild(authenticationRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AuthenticationRoutingModule {}
