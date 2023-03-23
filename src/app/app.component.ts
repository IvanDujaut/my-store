import { Component } from '@angular/core';

import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  imgRta = '';

  constructor(
    private usersService: UsersService,
    private filesService: FilesService
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

  public downloadPDF() {
    this.filesService
      .getFile(
        'my.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  public onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file).subscribe(rta => {
        this.imgRta = rta.location;
      });
    }
  }
}
