import {NgModule} from '@angular/core'
import {sharedComponents, sharedModules} from './index'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {NgxPaginationModule} from 'ngx-pagination'

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule
  ],
  declarations: [
    ...sharedComponents
  ],
  exports: [
    ...sharedComponents,
    ...sharedModules
  ]
})

export class SharedModule {}
