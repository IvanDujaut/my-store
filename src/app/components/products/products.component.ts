import { Component, OnInit } from '@angular/core';

import {
  Product_Response,
  CreateProductDTO,
  UpdateProductDTO,
} from '../../models/product.models';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product_Response[] = [];
  total = 0;

  // renderizar una familia de productos
  // desde el padre
  products: Product_Response[] = [];
  showProductDetails = false;
  productChosen: Product_Response = {
    id: '',
    title: '',
    price: 0,
    description: '',
    category: {
      id: '',
      name: '',
    },
    images: [],
  };

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService //asincrono
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }

  public onAddToShoppingCart(product: Product_Response): void {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  public toggleProductDetail(): void {
    this.showProductDetails = !this.showProductDetails;
  }

  public onShowDetail(id: string): void {
    this.productsService.getProduct(id).subscribe((data) => {
      console.log('product', data);
      this.toggleProductDetail();
      this.productChosen = data;
    });
  }

  public createNewProduct(): void {
    const product: CreateProductDTO = {
      title: 'Nuevo Producto',
      description: 'bla bla',
      images: ['https://placeimg.com/640/480/any'],
      price: 1000,
      categoryId: 2,
    };
    this.productsService.createProduct(product).subscribe((data) => {
      console.log('created', data);
      this.products.unshift(data); //insertamos en el array en la primera posicion
    });
  }

  public updateProduct(): void {
    const changes: UpdateProductDTO = {
      title: 'change title',
    };
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe((data) => {
      console.log('updated', data);
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products[productIndex] = data;
    });
  }
}
