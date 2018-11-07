import { MatExpansionModule } from '@angular/material/expansion';
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
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {MatBadgeModule, MatButtonModule, MatListModule} from '@angular/material';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule, // Must be imported here if I want to use modal component from shared module inside navigation component from core module
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatBadgeModule,
    MatListModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    })
  ],
  declarations: [
    ...coreComponents
  ],
  providers: [
    ...coreServices,
  ],
  exports: [
    ...coreComponents,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) throw new Error('You shall not run!')
  }
}
