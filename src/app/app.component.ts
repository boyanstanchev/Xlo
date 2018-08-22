import {Component} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBHn91ex8QQzNLvvjvqbHzbADMqh1fGbrM',
      authDomain: 'https://xlo-exam.firebaseio.com/',
      databaseURL: "https://xlo-exam.firebaseio.com",
    });
  }
}
