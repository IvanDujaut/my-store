import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  imgParent = '';
  showImg = true;


  public onLoaded(img: string): void {
    console.log('log padre', img);
  }

  public toggleImg(): void {
    this.showImg = !this.showImg;
  }
}
