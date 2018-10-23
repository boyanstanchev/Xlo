import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ModalService} from '../../components/shared/modal/modal.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  constructor(private toastr: ToastrService,
              private router: Router,
              private modalService: ModalService,
              private db: AngularFireDatabase,
              private authService: AuthService) {

  }

  add(adTitle: string, adId: string, adPrice: number) {
    this.getItemsByAdId(adId).then((items) => {
      if (items.hasChildren()) {
        items.forEach((item) => {
          const cartRef = this.db.list(`shopping-cart/${this.authService.user.uid}`);
          const promise = cartRef.update(item.key, {quantity: item.val()['quantity'] + 1});
          promise.then(() => this.toastr.success('Quantity updated.'));
        })
      } else {
        const cartRef = this.db.list(`shopping-cart/${this.authService.user.uid}`);
        const promise = cartRef.push({
          adId,
          adTitle,
          adPrice,
          quantity: 1
        });
        promise.then(() => {
          this.toastr.success('Product added to shopping cart.');
        });
      }
    });
  }

  remove(cartItemId: string) {
    const cartRef = this.db.list(`shopping-cart/${this.authService.user.uid}`);
    cartRef.remove(cartItemId)
      .then(() => {
        this.toastr.success('Product removed successfully.');
      });
  }

  setQuantity(quantity: string, itemId: string) {
    if (+quantity <= 20) {
      const dbRef = this.db.list(`shopping-cart/${this.authService.user.uid}`)
      dbRef.update(itemId, {quantity: +quantity})
        .then(() => this.toastr.success('Quantity updated.'))
    } else {
      this.toastr.error('Quantity must be under 20. For wholesale message the retailer.')
    }
  }

  checkout(modalId: string) {
    this.modalService.close(modalId);
    this.router.navigate(['/checkout']);
  }

  getUserAll() {
    return this.db.list(`shopping-cart/${this.authService.user.uid}`).snapshotChanges();
  }

  getItemsByAdId(adId: string) {
    return this.db.object(`shopping-cart/${this.authService.user.uid}`).query.orderByChild('adId').equalTo(adId).once('value');
  }

}
