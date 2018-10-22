import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../core/services/shopping-cart.service';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems = [];
  total: number = 0;

  constructor(public cartService: ShoppingCartService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.cartService.getAllByUserId(this.authService.user.uid)
      .subscribe((items) => {
        items.forEach(item => {
          this.total += item.payload.val()['adPrice'] * item.payload.val()['quantity'];
        })

        this.cartItems = items;
      });
  }

}
