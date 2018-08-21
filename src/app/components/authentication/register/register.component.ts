import {Component, OnInit} from '@angular/core'
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService) {}

  register(form: NgForm) {
    const email = form.value.email
    const password = form.value.password
    this.authService.register(email, password)
  }

  ngOnInit() {
  }

}
