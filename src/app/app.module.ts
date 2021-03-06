import {NgModule} from '@angular/core'
import {AppRoutingModule} from './app-routing.module'
import {AuthenticationModule} from './components/authentication/authentication.module'
import {CategoriesModule} from './components/categories/categories.module'
import {AdsModule} from './components/ads/ads.module'
import {CoreModule} from './core/core.module'
import {AngularFireModule} from 'angularfire2'

import {AppComponent} from './app.component'

const config = {
  apiKey: 'AIzaSyBHn91ex8QQzNLvvjvqbHzbADMqh1fGbrM',
  authDomain: 'https://xlo-exam.firebaseio.com/',
  databaseURL: 'https://xlo-exam.firebaseio.com/'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(config),
    AppRoutingModule,
    AuthenticationModule,
    CategoriesModule,
    AdsModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
