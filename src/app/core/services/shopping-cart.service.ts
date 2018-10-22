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
    const cartRef = this.db.list('shopping-cart');
    const promise = cartRef.push({
      adId,
      adTitle,
      adPrice,
      userId: this.authService.user.uid,
      quantity: 1
    });
    promise.then(() => {
      this.toastr.success('Product added to shopping cart.');
    });
  }

  remove(cartItemId: string) {
    const cartRef = this.db.list(`shopping-cart`);
    cartRef.remove(cartItemId)
      .then(() => {
        this.toastr.success('Product removed successfully.');
      });
  }

  checkout(modalId: string) {
    this.modalService.close(modalId);
    this.router.navigate(['/checkout']);
  }

  getAllByUserId(userId: string) {
    return this.db.list('shopping-cart', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
  }

}
