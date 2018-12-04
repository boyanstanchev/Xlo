import {Injectable} from '@angular/core'
import {ToastrService} from 'ngx-toastr'
import {Router} from '@angular/router'
import {AngularFireDatabase} from 'angularfire2/database'
import {AngularFireAuth} from 'angularfire2/auth'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'

interface UserData {
  displayName: string,
  isAdmin: boolean,
  userId: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user  //TODO: Make this shit like auth guard so it saves state when refreshed
  public userData: UserData

  constructor(private toastr: ToastrService,
              private router: Router,
              private db: AngularFireDatabase,
              private auth: AngularFireAuth) {

    this.auth.user.pipe(map((user) => {
      this.user = user
    })).subscribe()
  }

  register(email: string, password: string, displayName: string, photoURL?: string) {
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
                this.saveUserData(displayName, user.user.uid, photoURL)
                  .then(() => {
                    this.router.navigate(['/profile/login'])
                    this.toastr.success('You are now registered. Please login to continue.')
                  })
              })
              .catch((err) => {
                this.toastr.error(err.message)
              })
          })
      })
      .catch((err) => {
        this.toastr.error(err.message)
      })
  }

  saveUserData(displayName: string, userId: string, photoURL?: string) {
    const userDataRef = this.db.list('userData')
    return userDataRef.push({
      userId: userId,
      displayName: displayName,
      isAdmin: false,
      photoURL: photoURL || ''
    })
  }

  login(email: string, password: string) {
    this.auth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/ads/featured'])
        this.toastr.success('You are now logged in.')
      })
      .catch((err) => {
        this.toastr.error(err.message)
      })
  }

  logout() {
    this.auth.auth.signOut()
      .then(() => {
        this.router.navigate(['/profile/login'])
        this.toastr.success('You are now singed out.')
      })
  }

  isAuthenticated(): boolean {
    return !!this.user
  }

  getUserDisplayName(userId: string): Observable<string> {
    return this.db.list('userData', ref => ref.orderByChild('userId').equalTo(userId).limitToFirst(1)).valueChanges().pipe(map((userData) => {
      return userData[0]['displayName']
    }))
  }

  getUserImageUrl(userId: string) {
    return this.db.list('userData', ref => ref.orderByChild('userId').equalTo(userId).limitToFirst(1)).valueChanges().pipe(map((userData) => {
      return userData[0]['photoURL']
    }))
  }

  getUserIsAdmin(userId: string): Observable<boolean> {
    return this.db.list('userData', ref => ref.orderByChild('userId').equalTo(userId).limitToFirst(1)).valueChanges().pipe(map((userData) => {
      return userData.length > 0 ? userData[0]['isAdmin'] : false
    }))
  }

}
