const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

const doSomething = () => {
  // retorna una promesa, una Promise tiene dos estados:
  // o se resuelve o se rechaza, en este caso a penas se
  // arma la promesa, la voy a resolver
  return new Promise((resolve) => {
    //resolve('valor 1');
    //resolve('valor 2');
    setTimeout(() => {
      resolve('valor 3');
    }, 3000);
  });
}

// a la promesa la tengo que correr en un context asincrono
(async () => {
  const rta = await doSomething();
  console.log(rta);
})();


//como observador

const doSomething$ = () => {
  return new Observable(observer => {
    observer.next('valor 1 $');
    observer.next('valor 2 $');
    observer.next('valor 3 $');
    observer.next(null);
    setTimeout(() => {
      observer.next('valor 4 $');
    }, 5000);
    setTimeout(() => {
      observer.next(null);
    }, 8000);
    setTimeout(() => {
      observer.next('valor 5 $');
    }, 10000);
  });
}

(() => {
  const obs$ = doSomething$();
  obs$
  .pipe(
    filter(value => value !== null) //filtro los datos que tienen null
  )
  .subscribe(rta => {
    console.log(rta);
  });
})();

