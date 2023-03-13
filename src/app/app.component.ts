import { Component } from '@angular/core';

import { Product_Response } from './models/product.models'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  imgParent = '';
  showImg = true;
  // renderizar una familia de productos
  // desde el padre
  products: Product_Response[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/images/toy.jpg'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.jpg'
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/album.jpg'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: './assets/images/books.jpg'
    },
  ];


  public onLoaded(img: string): void {
    console.log('log padre', img);
  }

  public toggleImg(): void {
    this.showImg = !this.showImg;
  }
}
