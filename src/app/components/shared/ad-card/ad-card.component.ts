import {Component, Input, OnInit} from '@angular/core'
import {AuthService} from '../../../core/services/auth.service'

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: []
})
export class AdCardComponent implements OnInit {

  constructor(public authService: AuthService) { }

  @Input() ads

  ngOnInit() {
  }

}
