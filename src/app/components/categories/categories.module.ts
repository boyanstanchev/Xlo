import {NgModule} from '@angular/core';
import {categoriesComponents} from './index';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../../app-routing.module';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ...categoriesComponents
  ],
  imports: [
    FormsModule,
    CommonModule,
    AppRoutingModule,
    SharedModule
  ]
})

export class CategoriesModule {}
