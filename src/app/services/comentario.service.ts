import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {
  IComentario,
  IComentarioResponse,
  IComentariosResponse,
} from '../interfaces/IComentario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  constructor() {}
  getComentarios(): Observable<IComentariosResponse> {
    return this.http.get<IComentariosResponse>(`${this.apiUrl}/comentarios`);
  }
  addComentario(comentario: IComentario): Observable<IComentarioResponse> {
    return this.http.post<IComentarioResponse>(
      `${this.apiUrl}/comentarios`,
      comentario
    );
  }
  deleteComentario(id: string): Observable<IComentarioResponse> {
    return this.http.delete<IComentarioResponse>(
      `${this.apiUrl}/comentarios/${id}`
    );
  }
}
