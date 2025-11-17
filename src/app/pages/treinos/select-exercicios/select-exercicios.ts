import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Treino, TreinosService } from '../../../services/treinos';
import { Router } from '@angular/router';
import { CATEGORIAS_EXERCICIOS } from '../../../shared/categorias-exercicios';

@Component({
  selector: 'app-select-exercicios',
  standalone: true,
  templateUrl: './select-exercicios.html',
  styleUrls: ['./select-exercicios.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class SelectExerciciosComponent {

  form!: FormGroup;

  categorias=CATEGORIAS_EXERCICIOS;

  constructor(
    private fb: FormBuilder,
    private treinosService: TreinosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['Meu Treino'],
      exerciciosSelecionados: [[]]
    });
  }

  toggleExercicio(exercicio: string) {
    const selecionados = this.form.value.exerciciosSelecionados as string[];

    if (selecionados.includes(exercicio)) {
      this.form.patchValue({
        exerciciosSelecionados: selecionados.filter(x => x !== exercicio)
      });
    } else {
      this.form.patchValue({
        exerciciosSelecionados: [...selecionados, exercicio]
      });
    }
  }

  salvar() {
    const usuarioId = localStorage.getItem('usuarioId')!;

    const treino = {
      nome: this.form.value.nome,
      descricao: (this.form.value.exerciciosSelecionados || []).join(', '),
      duracao: 45,
      usuarioId: usuarioId
    } as Treino



    this.treinosService.criar(treino).subscribe(() => {
      alert("Treino criado com sucesso!");
      this.router.navigate(['/treinos/listar']);
    });
  }

  cancelar() {
    this.router.navigate(['/menu'])
  }
}
