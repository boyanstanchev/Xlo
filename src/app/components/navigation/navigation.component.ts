import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {ModalService} from '../shared/modal/modal.service';
import {ShoppingCartService} from '../../core/services/shopping-cart.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: []
})
export class NavigationComponent implements OnInit {
  cartItems = []
  user
  isAdmin: boolean = false

  constructor(public authService: AuthService,
              public modalService: ModalService,
              public cartService: ShoppingCartService,
              public auth: AngularFireAuth) {
  }

  openModal(id: string) {
    this.cartService.getAllByUserId(this.auth.auth.currentUser.uid)
      .subscribe((items) => {
        this.cartItems = []
        items.forEach((item) => {
          this.cartItems.push({
            adTitle: item.payload.val()['adTitle'],
            adId: item.payload.val()['adId'],
            adPrice: item.payload.val()['adPrice'],
            cartItemId: item.key
          })
        })
        this.modalService.open(id);
      })
  }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      this.user = user
      if (user) {
        this.authService.getUserData(user.uid)
          .subscribe((user) => {
            this.isAdmin = user[0].payload.val()['isAdmin']
          })
      }
    })
  }
}
