import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Product_Response,
  CreateProductDTO,
  UpdateProductDTO,
} from '../models/product.models';
import { Observable, zip } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from './../../environments/environment';
import { User, CreateUserDTO } from './../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.API_URL}/api/users`;

  constructor(private http: HttpClient) {}

  // Metodo para hacer la creacion
  public create(dto: CreateUserDTO) {
    return this.http.post<User>(this.apiUrl, dto);
  }

  // Metodo para obtener todos los usuarios
  public getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
