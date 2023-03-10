import { Component } from '@angular/core';

import { Product } from './product.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  widthImg = 10;
  name = 'Ivan'; // 👈 public
  age = 28;
  img = 'https://www.w3schools.com/howto/img_avatar.png';
  btnDisabled = true;
  register = {
    name: '',
    email: '',
    password: '',
  }
  person = {
    name: 'Ivan',
    age: 28,
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
  }
  names: (string | number)[] = ['Nico', 'Ivan', 'Santi', 12];
  newName = '';
  box = {
    width: 100,
    height: 100,
    background: 'red',
  }

  //Array de objetos del tipo Product
  products: Product[] = [
    {
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/images/toy.jpg',
      category: 'all',
    },
    {
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.jpg'
    },
    {
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/album.jpg'
    },
    {
      name: 'Mis libros',
      price: 23,
      image: './assets/images/books.jpg'
    },
    {
      name: 'Casa para perro',
      price: 34,
      image: './assets/images/house.jpg'
    },
    {
      name: 'Gafas',
      price: 3434,
      image: './assets/images/glasses.jpg'
    }
  ]

  /**Empezamos a trabajar con metodos
   * Estos tambien tienen su modo
   * de acceso, privado o publico. Si lo
   * vamos a usar en el render tiene
   * que ser publico. Esta clase tiene un
   * comportamiento 'toggleButton'
   */

  public toggleButton(): void {
    //this.btnDisabled = false; --> podemos mejorar esto para que se active y desactive
    this.btnDisabled = !this.btnDisabled;
  }

  public increaseAge(): void {
    this.person.age++;
  }

  public onScroll(event: Event): void {
    /**Dependiendo del elemento que estamos trabajando
     * podemos tener algunas propiedades. En este caso
     * tenemos un div, eso serial un HTMLElement. Si
     * tuvieramos un input difiere un poco de los elementos
     * que podemos tener. Cada elemento tiene sus propias
     * particularidades.
     * event.target ==> necesitamos el elemento html y que se
     * va a comportar como un HTMLElement y despues quiero leer
     * la posicion del scroll
     */
    const element = event.target as HTMLElement;
    console.log(element.scrollTop);
  }

  public changeName(event: Event): void {
    const element = event.target as HTMLInputElement;
    this.person.name = element.value;
  }

  public addName(): void {
    this.names.push(this.newName);
    this.newName = ''; //porque usamos Data Binding
  }

  public deleteName(index: number): void {
    this.names.splice(index, 1);
  }

  public onRegister(): void {
    console.log();
  }
}
