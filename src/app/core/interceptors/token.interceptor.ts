import {Injectable} from "@angular/core"
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http"
import {Observable} from "rxjs"

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler)
  : Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('authtoken')
    if (token && !req.url.endsWith('obiavi.json')) {
      req = req.clone({
        url: `${req.url}?auth=${token}`
      })
    }

    return next.handle(req)
  }
}
