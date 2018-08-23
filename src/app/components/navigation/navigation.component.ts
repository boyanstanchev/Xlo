import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [] //'./navigation.component.css'
})
export class NavigationComponent implements OnInit {
  displayName: string = sessionStorage.getItem('displayName')
  userId: string = sessionStorage.getItem('userId')

  constructor(public authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
