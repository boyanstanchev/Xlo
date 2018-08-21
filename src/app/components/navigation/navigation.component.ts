import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [] //'./navigation.component.css'
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
