import {NgModule, Optional, SkipSelf} from '@angular/core';
import {
  coreServices,
  coreComponents
} from './index';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../components/shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule, // SHOULD I IMPORT THIS? How can I use modal component from shared module?,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  declarations: [
    ...coreComponents
  ],
  providers: [
    ...coreServices
  ],
  exports: [
    ...coreComponents,
    HttpClientModule,
    BrowserAnimationsModule
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) throw new Error('You shall not run!')
  }
}
