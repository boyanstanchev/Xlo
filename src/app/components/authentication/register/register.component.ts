import {Component} from '@angular/core'
import {NgForm} from '@angular/forms'
import {AuthService} from '../../../core/services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  register(form: NgForm) {
    const email = form.value.email
    const password = form.value.password
    const displayName = form.value.firstName + ' ' + form.value.lastName
    const photoURL = form.value.photoURL
    this.authService.register(email, password, displayName, photoURL)
  }
}
