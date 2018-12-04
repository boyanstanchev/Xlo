import {Injectable} from '@angular/core'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router'
import {Observable} from 'rxjs'
import {ToastrService} from 'ngx-toastr'
import {AuthService} from '../services/auth.service'
import {AngularFireAuth} from 'angularfire2/auth'
import {AngularFireDatabase} from 'angularfire2/database'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  isAdmin: boolean

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private auth: AngularFireAuth,
              private db: AngularFireDatabase) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.db.list('userData', ref => ref.orderByChild('userId').equalTo(this.authService.user.uid).limitToFirst(1)).valueChanges()
      .pipe(
        map((data) => {
          if (data[0]['isAdmin']) {
            return true
          } else {
            this.router.navigate(['/profile/login']);
            this.toastr.error('You must be admin to enter this page.');
            return false;
          }
        })
      )
  }
}
