import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TreinosService, Treino } from '../../../services/treinos';
import { RouterModule } from '@angular/router';
import { CATEGORIAS_EXERCICIOS } from '../../../shared/categorias-exercicios';

@Component({
  selector: 'app-edit-treino',
  standalone: true,
  templateUrl: './edit-treinos.html',
  styleUrls: ['./edit-treinos.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class EditTreinoComponent implements OnInit {
  form!: FormGroup;
  treinoId!: number;

  categorias=CATEGORIAS_EXERCICIOS;

  constructor(
    private fb: FormBuilder,
    private treinosService: TreinosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  originalId!: string; // novo campo


  ngOnInit() {
    this.originalId = this.route.snapshot.paramMap.get('id')!; // pega string
    console.log('Original ID carregado:', this.originalId);

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      exerciciosSelecionados: [[]]
    });

    this.treinosService.buscarPorId(this.originalId).subscribe(treino => {
      const exerciciosArray = treino.descricao.split(',').map(e => e.trim().toLowerCase());
      this.form.patchValue({
        nome: treino.nome,
        exerciciosSelecionados: exerciciosArray
      });
    });
  }

  toggleExercicio(exercicio: string) {
  const selecionados = this.form.value.exerciciosSelecionados as string[];
  const exLower = exercicio.toLowerCase();

  if (selecionados.includes(exLower)) {
    this.form.patchValue({
      exerciciosSelecionados: selecionados.filter(x => x !== exLower)
    });
  } else {
    this.form.patchValue({
      exerciciosSelecionados: [...selecionados, exLower]
    });
  }
}



  atualizar() {
    if (this.form.invalid) return;

    const usuarioId = localStorage.getItem('usuarioId')!;
    const treinoAtualizado: Treino = {
      id: 0, // não importa, o service vai usar originalId
      originalId: this.originalId, // ESSENCIAL para PUT
      nome: this.form.value.nome,
      descricao: this.form.value.exerciciosSelecionados.join(', '),
      duracao: 45,
      usuarioId
    };

    this.treinosService.atualizar(treinoAtualizado).subscribe(() => {
      alert('Treino atualizado com sucesso!');
      this.router.navigate(['/treinos/listar']);
    });
  }


  cancelar() {
    this.router.navigate(['/treinos/listar']);
  }
}
