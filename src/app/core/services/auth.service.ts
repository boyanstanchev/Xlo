import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _authtoken: string

  constructor(private toastr: ToastrService,
              private router: Router) {
  }

  /*
   The callback hell is real. Let me explain what's happening:

   The method 'createUserWithEmailAndPassword' logs in the user and I don't want that so right after that I log him out. Then I update his profile with the display name and isAdmin property from registration form. Then I call the function 'saveUserDisplayName' which creates new collection in database with userId + user display name. This is necessary because firebase does not allow access to other user's data like displayName. But in every ad I want to display the creator so I just use the created collection to retrieve it.

 'I am a genius!!'
        - Boyan Stanchev 2018
   */

  register(email: string, password: string, displayName: string) {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.auth().signOut()
          .then(() => {
            user.user.updateProfile({
              displayName,
              photoURL: ''
            })
              .then(() => {
                this.saveUserDisplayName(displayName, user.user.uid);
                this.router.navigate(['/login']);
                this.toastr.success('You are now registered. Please login to continue.');
              })
              .catch((err) => {
                this.toastr.error(err.message);
              });
          })
      })
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }

  saveUserDisplayName(displayName: string, userId: string) {
    const userDataRef = firebase.database().ref(`userData/${userId}`);
    let newStoreRef = userDataRef.push();
    newStoreRef.set({
      displayName: displayName,
      isAdmin: false
    });
  }

  login(email: string, password: string) {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authtoken = user.user['qa']
        this.router.navigate(['/']);
        this.toastr.success('You are now logged in.');
      })
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }

  get loggedInUser() {
    if (firebase.auth().currentUser) {
      return firebase.auth().currentUser.displayName;
    } else {
      return null;
    }
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  set authtoken(token) {
    this._authtoken = token
  }

  get authtoken() {
    return this._authtoken
  }

  logout() {
    firebase.auth().signOut()
      .then(() => {
        this.router.navigate(['/login']);
        this.toastr.success('You are now singed out.');
      });
  }

  isAuthenticated(): boolean {
    return !!firebase.auth().currentUser
  }

  getUserNameById(userId: string) {
    let usersRef = firebase.database().ref(`userData/${userId}`), name;
    return usersRef.once('value')
      .then((snapshot) => {
        name = snapshot;
        return name;
      });
  }

}
