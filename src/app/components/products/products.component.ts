import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';
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

  //para hacerlo de forma dinamicamente, fijamos las CI
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService //asincrono
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getProductsByPage(10, 0).subscribe((data) => {
      console.log(data);
      this.products = data;
      this.offset += this.limit;
    });
  }

  public onAddToShoppingCart(product: Product_Response): void {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  public toggleProductDetail(): void {
    this.showProductDetails = !this.showProductDetails;
  }

  /*public onShowDetail(id: string): void {
    this.statusDetail = 'loading';
    this.productsService.getProduct(id)
    .subscribe((data) => {
      console.log('product', data);
      this.toggleProductDetail();
      this.productChosen = data;
      this.statusDetail = 'success';
    }, response => {
      console.log(response);//error nativo que me mandaria el backend      this.statusDetail = 'error';
      this.statusDetail = 'error';
    });
  }*/

  public onShowDetail(id: string): void {
    this.statusDetail = 'loading';
    this.productsService.getProduct(id).subscribe({
      next: (resp) => {
        console.log('product', resp);
        this.toggleProductDetail();
        this.productChosen = resp;
        this.statusDetail = 'success';
      },
      error: (errorMsg) => {
        window.alert(errorMsg);
        this.statusDetail = 'error';
      },
      complete: () => console.info('complete'),
    });
  }

  // public readAndUpdate(id: string) {
  //   this.productsService
  //     .getProduct(id)
  //     .pipe(
  //       switchMap((product) =>
  //         this.productsService.update(product.id, { title: 'change' })
  //       )
  //       /**Cuantos switchMap quieras */
  //       // switchMap((product) =>
  //       //   this.productsService.update(product.id, { title: 'change' })
  //       // )
  //       // switchMap((product) =>
  //       //   this.productsService.update(product.id, { title: 'change' })
  //       // )
  //     )
  //     .subscribe((data) => {
  //       {
  //         // Apenas obtengamos el producto queremos enviar una actualizacion
  //         // como podriamos hacer esto? Lo primero que diriamos es bueno dentro
  //         // del subscribe apenas tengo ese producto vamos a darle un
  //         // update
  //         const product = data;
  //         this.productsService
  //           .update(product.id, { title: 'change' })
  //           // y luego otro subscribe con la rta de la actualizacion
  //           .subscribe((rtaUpdate) => {
  //             console.log(rtaUpdate);
  //             // esto es lo que hay que evitar, es aprte del Callback Hell
  //             // porque, que pasa si dentro del Update despues de recibir
  //             // la rta queremos ejecutar otra cosa internamente? Entonces
  //             // se va abriendo cada vez anidando mas subscribe
  //           });
  //       }
  //     });
  // }

  /** SwitchMap para resolver observables dependientes (sincrono)
   *  Zip para resolver observables independendientes (asincrono)
   * similar a Promise.all y recibir la rta al mismo tiempo.
   * Esta logica deberia ir en el servicio no en el componente
   * para poder reutilizarlo
   */

  public readAndUpdate(id: string) {
    this.productsService
      .getProduct(id)
      .pipe(
        switchMap((product) =>
          this.productsService.update(product.id, { title: 'change' })
        )
      )
      .subscribe((data) => {
        console.log(data);
      });
    // zip(
    //   this.productsService.getProduct(id),
    //   this.productsService.update(id, { title: 'nuevo' })
    // )
    this.productsService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe((response) => {
      const read = response[0];
      const update = response[1];
    });
  }

  public createNewProduct(): void {
    const product: CreateProductDTO = {
      title: 'Nuevo Producto',
      description: 'bla bla',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
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

  public deleteProduct(): void {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetails = false;
    });
  }

  public loadMore() {
    this.productsService
      .getProductsByPage(this.limit, this.offset)
      .subscribe((data) => {
        console.log(data);
        // this.products = data; Estoy pisando los datos y en realidad necesito que se vayan concatenando
        // sin embargo concat es un metodo de los arrays inmutable, es decir,
        // no modifica el array original, entonces como necesitamos que lo modifique:
        this.products = this.products.concat(data);
        // incrementamos el offset cuando hagamos el
        // siguiente request:
        this.offset += this.limit;
      });
  }
}
