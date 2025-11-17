import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

export interface Treino {
  id: number;         // USADO INTERNAMENTE
  originalId?: string // USADO PARA PUT/DELETE NO BACKEND
  nome: string;
  descricao: string;
  duracao: number;   // EM MINUTOS
  usuarioId: string;
}

@Injectable({
  providedIn: "root"
})
export class TreinosService {
  private apiUrl = "http://localhost:3000/treinos";

  constructor(private http: HttpClient) {}

  private stringToNumber(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
     hash = (hash << 5) - hash + str.charCodeAt(i);
     hash |= 0; // força 32-bit
    }

    return Math.abs(hash);
  }


listar(): Observable<Treino[]> {
  const usuarioId = localStorage.getItem('usuarioId');
  const url = usuarioId ? `${this.apiUrl}?usuarioId=${usuarioId}` : this.apiUrl;

  return this.http.get<any[]>(url).pipe(
    map(treinos => treinos.map(t => ({
      ...t,
      id: this.stringToNumber(t.id),
      originalId: t.id // guarda ID real
    })))
  );
}



  buscarPorId(id: string): Observable<Treino> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(t => ({
        ...t,
        id: this.stringToNumber(t.id),
        originalId: t.id
      }))
    );
  }

  criar(treino: Treino): Observable<Treino> {
    const { id, originalId, ...dados } = treino;
    return this.http.post<any>(this.apiUrl, dados).pipe(
      map(t => ({
        ...t,
        id: this.stringToNumber(t.id),
        originalId: t.id
      }))
    );
  }


  atualizar(treino: Treino): Observable<Treino> {
    if (!treino.originalId) {
      throw new Error('originalId não encontrado para atualização');
    }
    return this.http.put<any>(`${this.apiUrl}/${treino.originalId}`, treino).pipe(
      map(t => ({
        ...t,
        id: this.stringToNumber(t.id),
        originalId: t.id
      }))
    );
  }

  remover(treino: Treino): Observable<void> {
    if (!treino.originalId) {
      throw new Error('originalId não encontrado para remoção');
    }
    return this.http.delete<void>(`${this.apiUrl}/${treino.originalId}`);
  }

}
