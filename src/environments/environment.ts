// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /* en modo desarrollo, no necesitamos una API_URL, lo
  dejamos en vacio porque en desarrollo no necesitamos esto
  porque tenemos un proxy que lo envia hacia el origen
  */
  API_URL: 'https://young-sands-07814.herokuapp.com', //deberia ser vacio pero devuelve un 404, el proxy no funciona
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
