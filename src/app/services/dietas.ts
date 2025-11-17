import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

export interface Dieta {
  id: number;
  originalId?: string;
  nome: string;
  descricao: string;
  calorias: number;
  usuarioId: string;
}

@Injectable({ providedIn: "root" })
export class DietasService {
  private apiUrl = "http://localhost:3000/dietas";

  constructor(private http: HttpClient) {}

  private stringToNumber(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  listar(): Observable<Dieta[]> {
    const usuarioId = localStorage.getItem('usuarioId');
    const url = usuarioId ? `${this.apiUrl}?usuarioId=${usuarioId}` : this.apiUrl;

    return this.http.get<any[]>(url).pipe(
      map(dietas => dietas.map(d => ({
        ...d,
        id: this.stringToNumber(d.id),
        originalId: d.id
      })))
    );
  }

  buscarPorId(id: string): Observable<Dieta> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(d => ({
        ...d,
        id: this.stringToNumber(d.id),
        originalId: d.id
      }))
    );
  }

  criar(dieta: Dieta): Observable<Dieta> {
    const { id, originalId, ...dados } = dieta;
    return this.http.post<any>(this.apiUrl, dados).pipe(
      map(d => ({
        ...d,
        id: this.stringToNumber(d.id),
        originalId: d.id
      }))
    );
  }

  atualizar(dieta: Dieta): Observable<Dieta> {
    if (!dieta.originalId) throw new Error('originalId não encontrado para atualização');
    return this.http.put<any>(`${this.apiUrl}/${dieta.originalId}`, dieta).pipe(
      map(d => ({
        ...d,
        id: this.stringToNumber(d.id),
        originalId: d.id
      }))
    );
  }

  remover(dieta: Dieta): Observable<void> {
    if (!dieta.originalId) throw new Error('originalId não encontrado para remoção');
    return this.http.delete<void>(`${this.apiUrl}/${dieta.originalId}`);
  }
}
