import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _authtoken: string;

  constructor(private toastr: ToastrService,
              private router: Router,
              private db: AngularFireDatabase,
              private auth: AngularFireAuth) {
  }

  register(email: string, password: string, displayName: string) {
    this.auth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.auth.auth.signOut()
          .then(() => {
            user.user.updateProfile({
              displayName,
              photoURL: ''
            })
              .then(() => {
                this.saveUserDisplayName(displayName, user.user.uid)
                  .then(() => {
                    this.router.navigate(['/profile/login']);
                    this.toastr.success('You are now registered. Please login to continue.');
                  });
              })
              .catch((err) => {
                this.toastr.error(err.message);
              });
          });
      })
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }

  saveUserDisplayName(displayName: string, userId: string) {
    const userDataRef = this.db.list('userData');
    return userDataRef.push({
      userId: userId,
      displayName: displayName,
      isAdmin: false
    });
  }

  login(email: string, password: string) {
    this.auth.auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authtoken = user.user['qa'];
        this.router.navigate(['/ads/featured']);
        this.toastr.success('You are now logged in.');
      })
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }

  set authtoken(token) {
    this._authtoken = token;
  }

  get authtoken() {
    return this._authtoken;
  }

  logout() {
    this.auth.auth.signOut()
      .then(() => {
        this.router.navigate(['/profile/login']);
        this.toastr.success('You are now singed out.');
      });
  }

  isAuthenticated(): boolean {
    return !!this.auth.auth.currentUser
  }

  getUserData(userId: string) {
    return this.db.list('userData', ref => ref.orderByChild('userId').equalTo(userId).limitToFirst(1)).snapshotChanges();
  }

}
