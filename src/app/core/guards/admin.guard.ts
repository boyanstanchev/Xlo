import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let isAdmin = false
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let userDataRef = firebase.database().ref();
        userDataRef.child('userData').child(firebase.auth().currentUser.uid)
          .once('value')
          .then((snapshot) => {
            snapshot.forEach((child) => {
              isAdmin = child.val().isAdmin;
            });
          });
      }
    });
    if (isAdmin) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.toastr.error('You must be admin to enter this page.');
      return false;
    }
  }
}
