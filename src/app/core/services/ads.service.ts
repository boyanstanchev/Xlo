import {Injectable} from "@angular/core"
import * as firebase from "firebase"
import {ToastrService} from "ngx-toastr"
import {Router} from "@angular/router"
import {HttpClient} from '@angular/common/http';

const BASE_URL: string = 'https://xlo-exam.firebaseio.com/obiavi'

@Injectable({
  providedIn: 'root'
})

export class AdsService {
  constructor(private toastr: ToastrService,
              private router: Router,
              private http: HttpClient) {}

  getFeaturedAds() {
    return this.http.get(`${BASE_URL}.json`)
  }
}
