import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  constructor(private toastr: ToastrService,
              private router: Router) {
  }

  add(adTitle: string, adId: string, adPrice: string) {
    const cartRef = firebase.database().ref('shopping-cart');
    let newStoreRef = cartRef.push();
    newStoreRef.set({
      adId,
      adTitle,
      adPrice,
      userId: firebase.auth().currentUser.uid
    })
      .then(() => {
        this.toastr.success('Product added to shopping cart.');
      })
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }

  remove(cartItemId: string) {
    const cartRef = firebase.database().ref(`shopping-cart/${cartItemId}`);
    cartRef.remove()
      .then(() => {
        document.getElementById(cartItemId).outerHTML = "";
        this.toastr.success('Product removed successfully.')
      })
      .catch((err) => {
        this.toastr.error(err.message)
      })
  }

  getAllByUserId(userId: string) {
    const cartRef = firebase.database().ref('shopping-cart');
    let peep
    return cartRef.orderByChild('userId').equalTo(userId)
      .once('value')
      .then((snapshot) => {
        peep = snapshot
        return peep
      })
  }
}
