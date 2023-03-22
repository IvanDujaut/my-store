import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { StoreService } from '../../services/store.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu: boolean = false;
  counter = 0;
  token = '';
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleMenu(): void {
    this.activeMenu = !this.activeMenu;
  }

  public login() {
    this.authService.login('sebas@gmail.com', '1212')
    .subscribe((rta) => {
      console.log(rta.access_token);
      this.token = rta.access_token;
      this.getProfile();
    });
  }

  public getProfile() {
    this.authService.profile(this.token)
    .subscribe(user => {
      this.profile = user;
    });
  }
}
