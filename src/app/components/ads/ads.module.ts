import {NgModule} from '@angular/core';
import {adsComponents} from './index';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {AdsRoutingModule} from './ads-routing.module';

@NgModule({
  declarations: [
    ...adsComponents
  ],
  imports: [
    FormsModule,
    CommonModule,
    AdsRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})

export class AdsModule {}
