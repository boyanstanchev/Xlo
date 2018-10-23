import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../core/services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems = [];
  total: number = 0;

  constructor(public cartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.cartService.getUserAll()
      .subscribe((items) => {
        this.total = 0
        items.forEach(item => {
          this.total += item.payload.val()['adPrice'] * item.payload.val()['quantity'];
        })

        this.cartItems = items;
      });
  }

}
