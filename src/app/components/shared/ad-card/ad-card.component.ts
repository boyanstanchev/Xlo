import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {ShoppingCartService} from '../../../core/services/shopping-cart.service';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: []
})
export class AdCardComponent implements OnInit {

  constructor(public authService: AuthService,
              public cartService: ShoppingCartService) { }

  @Input() ads

  ngOnInit() {
  }

}
