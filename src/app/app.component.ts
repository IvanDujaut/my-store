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
}
