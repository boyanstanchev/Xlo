import {NgModule} from '@angular/core';
import {sharedComponents, sharedModules} from './index';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,    //Not really sure if this is supposed to be here?
    RouterModule    //Not really sure if this is supposed to be here?
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
