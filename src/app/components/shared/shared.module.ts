import {NgModule} from '@angular/core';
import {sharedComponents} from './index';

@NgModule({
  declarations: [
    ...sharedComponents
  ],
  exports: [
    ...sharedComponents
  ]
})

export class SharedModule {}
