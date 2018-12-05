import {Component, Input} from '@angular/core'
import {AuthService} from '../../../core/services/auth.service'

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})
export class AdCardComponent {

  constructor(public authService: AuthService) { }

  @Input() ads

}
