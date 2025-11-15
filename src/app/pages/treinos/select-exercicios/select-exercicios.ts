import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { TreinosService } from '../../../services/treinos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-exercicios',
  standalone: true,
  templateUrl: './select-exercicios.html',
  styleUrls: ['./select-exercicios.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class SelectExerciciosComponent {

  form!: FormGroup;

  categorias = [
    {
      nome: "Peito",
      exercicios: [
        "Supino reto com barra",
        "Supino inclinado com barra",
        "Supino reto com halteres",
        "Supino inclinado com halteres",
        "Crucifixo reto com halteres",
        "Crucifixo inclinado",
        "Peck deck (fly machine)",
        "Flexão de braço (push-up)"
      ]
    },
    {
      nome: "Costas",
      exercicios: [
        "Puxada frontal na polia (pulldown)",
        "Remada curvada com barra",
        "Remada unilateral com halteres",
        "Remada baixa na máquina",
        "Remada alta de costas",
        "Levantamento terra"
      ]
    }
  ];

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
    const treino = {
      nome: this.form.value.nome,
      descricao: this.form.value.exerciciosSelecionados.join(', '),
      duracao: 45
    };

    this.treinosService.criar(treino).subscribe(() => {
      alert("Treino criado com sucesso!");
      this.router.navigate(['/treinos']);
    });
  }
}
