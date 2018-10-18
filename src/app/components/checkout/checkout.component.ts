import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../../core/services/shopping-cart.service';
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
      .subscribe((items) => {
        this.cartItems = []
        items.forEach((item) => {
          this.total += +item.payload.val()['adPrice']
          this.cartItems.push({
            adTitle: item.payload.val()['adTitle'],
            adId: item.payload.val()['adId'],
            adPrice: item.payload.val()['adPrice'],
            cartItemId: item.key
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
