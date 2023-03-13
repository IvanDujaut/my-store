import { Component, OnInit } from '@angular/core';

import { Product_Response } from '../../models/product.models'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product_Response[] = [];
  total = 0;

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
  constructor() { }

  ngOnInit(): void {
  }

  onAddToShoppingCart(product: Product_Response): void {
    this.myShoppingCart.push(product);
    this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
    console.log(product);
  }
}
