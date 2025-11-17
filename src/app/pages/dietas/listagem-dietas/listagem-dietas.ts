import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DietasService, Dieta } from '../../../services/dietas';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listagem-dietas',
  standalone: true,
  templateUrl: './listagem-dietas.html',
  styleUrls: ['./listagem-dietas.css'],
  imports: [CommonModule, RouterModule]
})
export class ListagemDietasComponent {
  dietas: Dieta[] = [];

  constructor(private dietasService: DietasService, private router: Router) {}

  ngOnInit() {
    this.dietasService.listar().subscribe(d => this.dietas = d);
  }

  editar(dieta: Dieta) {
    this.router.navigate(['/dietas/editar', dieta.originalId]);
  }

  excluir(dieta: Dieta) {
    if (confirm(`Deseja excluir a dieta "${dieta.nome}"?`)) {
      this.dietasService.remover(dieta).subscribe(() => {
        this.dietas = this.dietas.filter(d => d.originalId !== dieta.originalId);
      });
    }
  }
}
