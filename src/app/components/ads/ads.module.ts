import {NgModule} from '@angular/core';
import {adsComponents} from './index';
import {SharedModule} from '../shared/shared.module';
import {AdsRoutingModule} from './ads-routing.module';

@NgModule({
  declarations: [
    ...adsComponents
  ],
  imports: [
    AdsRoutingModule,
    SharedModule
  ]
})

export class AdsModule {}
