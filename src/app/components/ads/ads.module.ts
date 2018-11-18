import {NgModule} from '@angular/core';
import {adsComponents} from './index';
import {SharedModule} from '../shared/shared.module';
import {AdsRoutingModule} from './ads-routing.module';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  declarations: [
    ...adsComponents
  ],
  imports: [
    AdsRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule
  ]
})

export class AdsModule {}
