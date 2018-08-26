import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../../core/services/shopping-cart.service';
import {AuthService} from '../../core/services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems = []
  total: number = 0

  constructor(private cartService: ShoppingCartService) { }

  setUserItem(userId) {
    this.cartService.getAllByUserId(userId)
      .then((snapshot) => {
        this.cartItems = []
        snapshot.forEach((child) => {
          this.total += +child.val().adPrice
          this.cartItems.push({
            adTitle: child.val().adTitle,
            adId: child.val().adId,
            adPrice: child.val().adPrice,
            cartItemId: child.key
          })
        })
      })

  }

  remove(cartItemId: string) {
    this.cartService.remove(cartItemId)
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUserItem(firebase.auth().currentUser.uid)
      }
    });


  }

}
