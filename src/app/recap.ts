/** Conceptos basicos de Typescript */

// con typecript puedo explicitamente
// decir el tipo de la variable
const username: string | number = 'ivan';

const sum = (a: number, b: number) => {
  return a + b;
}

sum(1, 3);

class Person {
  age: number;
  lastName: string;

  constructor(age: number, lastName: string) {
    this.age = age;
    this.lastName = lastName;
  }
}

/** Como lo anterior es un template muy
 * usado entonces podemos mejorarlo a
 */

class Person2 {
  constructor(public age: number, public lastName: string) {};
}

const ivan = new Person2(28, 'Dujaut');

ivan.age = 30;
console.log(ivan.age);
