import {Injectable} from "@angular/core"
import * as firebase from "firebase"
import {ToastrService} from "ngx-toastr"
import {Router} from "@angular/router"


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  token: string = null

  constructor(private toastr: ToastrService,
              private router: Router) {}


  register(email: string, password: string, displayName: string) {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        let user = firebase.auth().currentUser

        user.updateProfile({
          displayName,
          photoURL: ''
        })
          .then(() => {
            this.router.navigate(['/login'])
            this.toastr.success('You are now registered. Please login to continue.')
          })
          .catch((err) => {
            this.toastr.error(err.message)
          })
      })
      .catch((err) => {
        this.toastr.error(err.message)
      })
  }

  login(email: string, password: string) {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        localStorage.setItem('displayName', user.user.displayName)
        this.getToken()
        this.router.navigate(['/'])
        this.toastr.success('You are now logged in.')
      })
      .catch((err) => {
        this.toastr.error(err.message)
      })
  }

  getToken() {
    firebase.auth()
      .currentUser
      .getIdToken()
      .then((token : string) => {
        this.token = token;
      })

    return this.token;
  }

  logout() {
    firebase.auth().signOut()
      .then(() => {
        this.token = null
        this.router.navigate(['/login'])
        this.toastr.success('You are now singed out.')
      })

  }

  isAuthenticated() {
    return !!this.token
  }
}
