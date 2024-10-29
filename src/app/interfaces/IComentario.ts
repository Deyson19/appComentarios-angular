export interface IComentario {
  _id?: string;
  nombre: string;
  comentario: string;
}
export interface IComentarioResponse {
  status: string;
  message: string;
  data: Data;
}
export interface IComentariosResponse {
  status: string;
  message: string;
  data: Data[];
}

export interface Data extends IComentario {
  createdAt: Date;
  updatedAt: Date;
}
