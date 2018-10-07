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
    //SharedModule, // TODO Check how can you use the modal component from shared module, without importing the shared module here! Refactor ad-card components so it doesn't have button for edit or details, it should only redirect to details.  The modal component is part of shared module. If I want to use in any other module's components I have to import shared module. So now I can use it in ads module or categories module but I can't use it in components from core module without importing shared module in it too, which is against the guide I read on the internet?! Food for thoughts
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
