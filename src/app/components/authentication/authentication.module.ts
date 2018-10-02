import {NgModule} from '@angular/core';

import {authenticationComponents} from './index';

import {SharedModule} from '../shared/shared.module';
import {AuthenticationRoutingModule} from './authentication-routing.module';

@NgModule({
  declarations: [
    ...authenticationComponents
  ],
  imports: [
    SharedModule,
    AuthenticationRoutingModule
  ]
})

export class AuthenticationModule {}
