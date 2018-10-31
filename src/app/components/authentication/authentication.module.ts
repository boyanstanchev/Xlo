import {NgModule} from '@angular/core';

import {authenticationComponents} from './index';

import {SharedModule} from '../shared/shared.module';
import {AuthenticationRoutingModule} from './authentication-routing.module';

import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MessagesDialog} from './my-profile/my-profile.component';
import {MatTooltipModule, MatListModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    ...authenticationComponents,
    MessagesDialog
  ],
  entryComponents: [
    MessagesDialog
  ],
  imports: [
    SharedModule,
    AuthenticationRoutingModule,
    MatTabsModule,
    MatDialogModule,
    MatTooltipModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule
  ]
})

export class AuthenticationModule {}
