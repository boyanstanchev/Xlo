import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [] //'./navigation.component.css'
})
export class NavigationComponent implements OnInit {
  displayName: string = sessionStorage.getItem('displayName')

  constructor(public authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
