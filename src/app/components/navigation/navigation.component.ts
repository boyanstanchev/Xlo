import {Component, OnInit, Inject} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {ShoppingCartService} from '../../core/services/shopping-cart.service';
import {AngularFireAuth} from 'angularfire2/auth';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  cartItems = []
  user
  isAdmin = false

  constructor(public authService: AuthService,
              public cartService: ShoppingCartService,
              public auth: AngularFireAuth,
              public dialog: MatDialog) {
  }

  openDialog(): void {
    this.dialog.open(MatDialog, {
      width: '700px',
      height: 'fit-content',
      data: this.cartItems
    })
  }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      this.user = user;
      if (user) {
        this.authService.getUserIsAdmin(user.uid)
          .subscribe((isAdmin: boolean) => {
            this.isAdmin = isAdmin;
          });

        this.cartService.getUserAll()
          .subscribe((items) => {
            this.cartItems = items;
          });
      }
    });
  }
}


@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog/cart-dialog.html',
  styleUrls: ['./cart-dialog/cart-dialog.css']
})

export class CartDialogComponent {

  constructor(public dialogRef: MatDialogRef<CartDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Observable<any>) {}

  
}
