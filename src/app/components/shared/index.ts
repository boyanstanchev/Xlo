import {ModalComponent} from './modal/modal.component';
import {AdCardComponent} from './ad-card/ad-card.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

export const sharedComponents = [
  ModalComponent,
  AdCardComponent
]

export const sharedModules = [
  CommonModule,
  FormsModule,
  NgxPaginationModule
]
