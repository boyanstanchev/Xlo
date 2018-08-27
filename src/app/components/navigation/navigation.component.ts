import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {ModalService} from '../shared/modal/modal.service';
import * as firebase from 'firebase';
import {ShoppingCartService} from '../../core/services/shopping-cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: []
})
export class NavigationComponent implements OnInit {
  cartItems = []
  isAdmin: boolean

  constructor(public authService: AuthService,
              private modalService: ModalService,
              private cartService: ShoppingCartService,
              private router: Router) {
  }

  openModal(id: string) {
    this.cartService.getAllByUserId(this.authService.userId)
      .then((snapshot) => {
        this.cartItems = []
        snapshot.forEach((child) => {
          this.cartItems.push({
            adTitle: child.val().adTitle,
            adId: child.val().adId,
            adPrice: child.val().adPrice,
            cartItemId: child.key
          })
        })
      })
    this.modalService.open(id);
  }

  remove(cartItemId: string) {
    this.cartService.remove(cartItemId)
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  checkout(modalId) {
    this.closeModal(modalId)
    this.router.navigate(['/checkout'])
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let userDataRef = firebase.database().ref()
        userDataRef.child('userData').child(firebase.auth().currentUser.uid)
          .once('value')
          .then((snapshot) => {
            snapshot.forEach((child) => {
              this.isAdmin = child.val().isAdmin
            })
          })
      }
    });
  }

}
