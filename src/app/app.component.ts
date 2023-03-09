import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'Ivan'; // 👈 public
  age = 28;
  img = 'https://www.w3schools.com/howto/img_avatar.png';
  btnDisabled = true;
  person = {
    name: 'Ivan',
    age: 28,
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
  }
}
