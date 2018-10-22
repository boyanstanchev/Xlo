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
import {AngularFireAuth} from 'angularfire2/auth';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private auth: AngularFireAuth) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.auth.authState.pipe(map((auth) => {
        if (auth !== null) {
          return true
        } else {
          this.router.navigate(['/profile/login']);
          this.toastr.error('You must be logged in to see this page');
          return false;
        }
      })
    )
  }
}
