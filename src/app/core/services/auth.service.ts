import {Injectable} from "@angular/core"
import * as firebase from "firebase"
import {ToastrService} from "ngx-toastr"
import {Router} from "@angular/router"


@Injectable({
  providedIn: 'root'
})

export class AuthService {

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
        sessionStorage.setItem('displayName', user.user.displayName)
        sessionStorage.setItem('authtoken', user.user['qa'])
        sessionStorage.setItem('userId', user.user['uid'])
        this.router.navigate(['/'])
        this.toastr.success('You are now logged in.')
      })
      .catch((err) => {
        this.toastr.error(err.message)
      })
  }

  logout() {
    firebase.auth().signOut()
      .then(() => {
        sessionStorage.clear()
        this.router.navigate(['/login'])
        this.toastr.success('You are now singed out.')
      })
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('authtoken')
  }
}
