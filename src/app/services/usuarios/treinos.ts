import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Treino {
  id?: number;
  nome: string;
  descricao: string;
  duracao: number; // minutos
}

@Injectable({
  providedIn: "root"
})
export class TreinosService {
  private apiUrl = "http://localhost:3000/treinos";

  constructor(private http: HttpClient) {}

  listar(): Observable<Treino[]> {
    return this.http.get<Treino[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Treino> {
    return this.http.get<Treino>(`${this.apiUrl}/${id}`);
  }

  criar(treino: Treino): Observable<Treino> {
    return this.http.post<Treino>(this.apiUrl, treino);
  }

  atualizar(id: number, treino: Treino): Observable<Treino> {
    return this.http.put<Treino>(`${this.apiUrl}/${id}`, treino);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
