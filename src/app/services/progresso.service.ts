import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Progresso {
  id?: number;
  usuarioId: string;
  pesoAtual: number;
  metaPeso: number;
  gorduraAtual: number;
  metaGordura: number;
  massaAtual: number;
  metaMassa: number;
}

@Injectable({ providedIn: 'root' })
export class ProgressoService {
  private apiUrl = 'http://localhost:3000/progresso';

  constructor(private http: HttpClient) {}

  listarPorUsuario(usuarioId: string): Observable<Progresso | null> {
    return this.http.get<Progresso[]>(`${this.apiUrl}?usuarioId=${usuarioId}`).pipe(
      map(progresso => progresso.length ? progresso[0] : null)
    );
  }

  salvar(progresso: Progresso): Observable<Progresso> {
    if (progresso.id) {
      return this.http.put<Progresso>(`${this.apiUrl}/${progresso.id}`, progresso);
    } else {
      return this.http.post<Progresso>(this.apiUrl, progresso);
    }
  }
}
