import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {ModalService} from '../modal/modal.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: []
})
export class NavigationComponent implements OnInit {
  cartItems

  constructor(public authService: AuthService,
              private modalService: ModalService) {
  }

  openModal(id: string) {
    this.cartItems = JSON.parse(sessionStorage.getItem('cartItems'))
    this.modalService.open(id);
  }

  remove(adId: string) {
    let cartItems = sessionStorage.getItem('cartItems')
    delete cartItems[adId]
    sessionStorage.setItem('cartItems', cartItems)
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
