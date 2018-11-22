import {NgModule, Optional, SkipSelf} from '@angular/core';
import {
  coreServices,
  coreComponents
} from './index';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '../app-routing.module';
import {ToastrModule} from 'ngx-toastr';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {MatBadgeModule, MatButtonModule, MatListModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {CartDialogComponent} from '../components/navigation/navigation.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatBadgeModule,
    MatListModule,
    MatIconModule,
 // MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    })
  ],
  entryComponents: [
    CartDialogComponent
  ],
  declarations: [
    ...coreComponents,
    CartDialogComponent
  ],
  providers: [
    ...coreServices,
  ],
  exports: [
    ...coreComponents,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) throw new Error('You shall not run!')
  }
}
