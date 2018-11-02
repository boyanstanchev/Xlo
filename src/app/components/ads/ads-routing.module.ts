import {RouterModule, Routes} from '@angular/router';
import {FeaturedComponent} from './featured/featured.component';
import {AddComponent} from './add/add.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {EditComponent} from './edit/edit.component';
import {DetailsComponent} from './details/details.component';
import {NgModule} from '@angular/core';

const adsRoutes: Routes = [
  {path: 'featured', component: FeaturedComponent},
  {path: 'add', component: AddComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard]}, //TODO: Make so only the owner can access it!
  {path: ':id', component: DetailsComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(adsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdsRoutingModule {}
