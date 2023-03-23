import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs/operators';

import { environment } from './../../environments/environment';

interface File {
  originalName: string;
  fileName: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private apiUrl = `${environment.API_URL}/api/files`;

  constructor(private http: HttpClient) {}

  public getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap((content) => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  public uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<File>(`${this.apiUrl}/upload`, dto, {
      /** Esto es depende de como lo trabajo tu equipo de
       * backend, dependiendo de como hayan decidio manipular
       * o recibir estos archivos.
       * Para saber si lo recibe con este header
       */
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    });
  }
}
