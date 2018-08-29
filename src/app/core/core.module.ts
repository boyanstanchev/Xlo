import {NgModule, Optional, SkipSelf} from '@angular/core';
import {coreServices} from './index';

@NgModule({
  providers: [
    ...coreServices
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) throw new Error('You shall not run!')
  }
}
