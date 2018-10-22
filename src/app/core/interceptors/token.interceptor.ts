import {Injectable} from "@angular/core"
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http"
import {Observable} from "rxjs"
import {AuthService} from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler)
  : Observable<HttpEvent<any>> {

    const token = this.authService.user['qa'] //TODO: take token other way
    console.log(token);
    if (token) {
      req = req.clone({
        url: `${req.url}?auth=${token}`
      })
    }

    return next.handle(req)
  }
}
