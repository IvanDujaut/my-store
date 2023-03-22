import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  public onLoaded(img: string): void {
    console.log('log padre', img);
  }

  public toggleImg(): void {
    this.showImg = !this.showImg;
  }

  public createUser() {
    this.usersService
      .create({
        name: 'Sebas',
        email: 'sebas@gmail.com',
        password: '1212',
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }
}
