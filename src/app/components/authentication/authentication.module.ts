import {NgModule} from '@angular/core';

import {authenticationComponents} from './index';

import {SharedModule} from '../shared/shared.module';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    ...authenticationComponents
  ],
  imports: [
    SharedModule,
    AuthenticationRoutingModule,
    MatTabsModule
  ]
})

export class AuthenticationModule {}
