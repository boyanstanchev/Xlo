import {NgModule} from '@angular/core'
import {sharedComponents, sharedModules} from './index'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {NgxPaginationModule} from 'ngx-pagination'
import {MatCardModule} from '@angular/material/card'

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule,
    MatCardModule
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
