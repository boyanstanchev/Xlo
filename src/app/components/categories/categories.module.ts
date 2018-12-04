import {NgModule} from '@angular/core'
import {categoriesComponents} from './index'
import {AppRoutingModule} from '../../app-routing.module'
import {SharedModule} from '../shared/shared.module'

@NgModule({
  declarations: [
    ...categoriesComponents
  ],
  imports: [
    AppRoutingModule,
    SharedModule
  ]
})

export class CategoriesModule {}
