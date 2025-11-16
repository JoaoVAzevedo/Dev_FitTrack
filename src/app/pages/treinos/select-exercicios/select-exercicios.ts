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
        "Remada baixa na polia",
        "Remada baixa na máquina",
        "Remada alta de costas",
        "Levantamento terra",
        "Barra fixa (pull-up)"
      ]
    },
    {
      nome: "Membros Inferiores",
      exercicios: [
        "Agachamento livre (com barra ou peso corporal)",
        "Leg press",
        "Avanço (lunge) com halteres.",
        "Cadeira extensora",
        "Mesa flexora",
        "Stiff (para posteriores)",
        "Elevação de panturrilhas (em pé ou sentado)",
        "Agachamento sumô com halteres"
      ]
    },
    {
      nome: "Bíceps",
      exercicios: [
        "Rosca direta com barra",
        "Rosca alternada com halteres",
        "Rosca martelo",
        "Rosca concentrada",
        "Rosca Scott (na máquina ou banco)",
        "Rosca na polia baixa",
        "Rosca 21 (variação com 21 repetições)",
        "Rosca inclinada com halteres"
      ]
    },
    {
      nome: "Tríceps",
      exercicios: [
        "Tríceps testa (com barra ou halteres)",
        "Tríceps corda na polia alta",
        "Tríceps francês (com halteres ou barra)",
        "Mergulho entre bancos",
        "Tríceps coice (kickback com halteres)",
        "Tríceps na barra paralela (dips)",
        "Tríceps unilateral na polia",
        "Tríceps fechado no supino (pegada junta)"
      ]
    },
    {
      nome: "Ombro",
      exercicios: [
        "Desenvolvimento com barra (ou halteres)",
        "Elevação lateral com halteres",
        "Elevação frontal com halteres",
        "Desenvolvimento Arnold",
        "Remada alta com barra",
        "Face pull (na polia)",
        "Elevação lateral inclinada (para deltoide posterior)",
        "Desenvolvimento militar na máquina"
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
      this.router.navigate(['/menu']);
    });
  }
}
