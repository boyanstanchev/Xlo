import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {}

  login(form: NgForm) {
    const email = form.value.email
    const password = form.value.password
    this.authService.login(email, password)
  }

  ngOnInit() {
  }

}
