import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {authenticationComponents} from './index';

import {SharedModule} from '../shared/shared.module';
import {AuthenticationRoutingModule} from './authentication-routing.module';

@NgModule({
  declarations: [
    ...authenticationComponents
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule
  ]
})

export class AuthenticationModule {}
