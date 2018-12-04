import {Component, OnInit} from '@angular/core'
import {AuthService} from '../../core/services/auth.service'
import {ShoppingCartService} from '../../core/services/shopping-cart.service'
import {AngularFireAuth} from 'angularfire2/auth'

import {MatDialog, MatDialogRef} from '@angular/material'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  count = 0
  user
  isAdmin = false

  constructor(public authService: AuthService,
              public cartService: ShoppingCartService,
              public auth: AngularFireAuth,
              public dialog: MatDialog) {
  }

  openDialog(): void {
    this.dialog.open(CartDialogComponent, {
      width: '700px',
      height: 'fit-content',
      closeOnNavigation: true,
      position: {
        top: '6%',
        left: '4%'
      },
      panelClass: 'cart-dialog'
    })
  }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      this.user = user
      if (user) {
        this.authService.getUserIsAdmin(user.uid)
          .subscribe((isAdmin: boolean) => {
            this.isAdmin = isAdmin
          })

        this.cartService.getItemsCount()
          .subscribe((count) => {
            this.count = count
          })
      }
    })
  }
}


interface Items {
  id: string,
  adTitle: string,
  adId: string,
  adPrice: number,
  quantity: number
}

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog/cart-dialog.html',
  styleUrls: ['./cart-dialog/cart-dialog.css']
})

export class CartDialogComponent {
  displayedColumns: string[] = ['item', 'quantity', 'cost']
  data: Array<Items> = []

  constructor(public dialogRef: MatDialogRef<CartDialogComponent>,
              public cartService: ShoppingCartService) {
    this.cartService.getUserAll().subscribe(items => this.data = items)
  }

  getTotalCost() {
    let total = 0

    this.data.forEach(i => {
      total += i.adPrice * i.quantity
    })

    return total
  }
}
