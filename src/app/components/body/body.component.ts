import {
  Component,
  inject,
  signal,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ComentarioService } from '../../services/comentario.service';
import { IComentario, Data } from '../../interfaces/IComentario';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html'
})
export class BodyComponent implements OnInit, OnChanges {
  private readonly _comentarioService = inject(ComentarioService);
  comentarios = signal<Data[]>([]);
  nombre: string;
  comentario: string;
  favoritos: IComentario[] = [];
  constructor() {
    this.nombre = '';
    this.comentario = '';
  }
  private getComentarios() {
    this._comentarioService.getComentarios().subscribe({
      next: (comentarios) => {
        console.log('Comentarios: ', comentarios);
        this.comentarios.set(comentarios.data);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error: ', error);
      },
    });
  }
  ngOnInit(): void {
    this.getComentarios();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes: ', changes);
  }
  enviarComentario() {
    console.log('Nombre: ', this.nombre);
    console.log('Comentario: ', this.comentario);
    if (this.comentario && this.nombre) {
      const comentario: IComentario = {
        nombre: this.nombre,
        comentario: this.comentario,
      };
      this._comentarioService.addComentario(comentario).subscribe({
        next: (comentario) => {
          console.log('Comentario: ', comentario);
          this.comentarios.update((x) => [
            ...this.comentarios(),
            comentario.data,
          ]);
        },
        error: (error: HttpErrorResponse) => {
          console.log('Error: ', error);
        },
      });
    }
    this.nombre = '';
    this.comentario = '';
  }
  reply(id: string) {
    console.log('Responder Comentario: ', id);
  }
  reTweet(id: string) {
    const comentario = this.comentarios().find((x) => x._id === id);
    console.log('Retweets: ', comentario);
  }
  addToFavorite(id: string) {
    const comentario = this.comentarios().find(
      (comentario) => comentario._id === id
    );
    console.log('Agregado a favoritos', comentario);
    if (comentario) {
      this.favoritos.push(comentario);
      console.log('Favoritos', this.favoritos);
    } else {
      console.error('No existe el comentario');
    }
  }
  private getFavorites() {
    console.log('Favoritos: ', this.favoritos);
  }
  deleteComment(id: string) {
    console.log('Eliminar Comentario: ', id);
    const remove = this._comentarioService.deleteComentario(id).subscribe({
      next: (comentario) => {
        console.log('Comentario eliminado: ', comentario);
        this.comentarios.update((x) =>
          x.filter((comentario) => comentario._id !== id)
        );
      },
    });
  }
}
