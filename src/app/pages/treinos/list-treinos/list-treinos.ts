import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TreinosService, Treino } from '../../../services/treinos';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-treinos',
  standalone: true,
  templateUrl: './list-treinos.html',
  styleUrls: ['./list-treinos.css'],
  imports: [CommonModule, RouterModule]
})
export class ListTreinosComponent implements OnInit {
  treinos: Treino[] = [];

  constructor(private treinosService: TreinosService, private router: Router) {}

  ngOnInit() {
    this.treinosService.listar().subscribe({
      next: (data) => this.treinos = data,
      error: (err) => console.error('Erro ao carregar treinos', err)
    });
  }

  editar(id: number) {
    this.router.navigate(['/treinos/editar', id]);
  }

  remover(id: number) {
    if (confirm('Deseja realmente excluir este treino?')) {
      this.treinosService.remover(id).subscribe(() => {
      this.treinos = this.treinos.filter(t => t.id !== id);
    });
    }
  }
}
