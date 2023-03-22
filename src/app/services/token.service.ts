import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // este servicio esta destinado a manipular el token, este
  // servicio deberia encargarse de guardar el token y obtenerlo
  // donde sea que lo hayamos guardado. Si lo guardamos en memoria,
  // en Local Storage o en una cookie
  constructor() { }

  public saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
}
