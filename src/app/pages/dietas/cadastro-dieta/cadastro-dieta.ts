import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DietasService, Dieta } from '../../../services/dietas';
import { CATEGORIAS_ALIMENTOS } from '../../../shared/categorias-alimentos';

@Component({
  selector: 'app-cadastro-dieta',
  standalone: true,
  templateUrl: './cadastro-dieta.html',
  styleUrls: ['./cadastro-dieta.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CadastroDietaComponent {
  form!: FormGroup;
  categorias = CATEGORIAS_ALIMENTOS;

  constructor(
    private fb: FormBuilder,
    private dietasService: DietasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      calorias: [0, [Validators.required, Validators.min(50)]],
      alimentosSelecionados: [[]]
    });
  }

  toggleAlimento(alimento: string) {
    const selecionados = this.form.value.alimentosSelecionados as string[];
    if (selecionados.includes(alimento)) {
      this.form.patchValue({ alimentosSelecionados: selecionados.filter(x => x !== alimento) });
    } else {
      this.form.patchValue({ alimentosSelecionados: [...selecionados, alimento] });
    }
  }

  salvar() {
    if (this.form.invalid) return;

    const usuarioId = localStorage.getItem('usuarioId')!;
    const dieta: Dieta = {
      nome: this.form.value.nome,
      descricao: (this.form.value.alimentosSelecionados || []).join(', '),
      calorias: this.form.value.calorias,
      usuarioId
    } as Dieta;

    this.dietasService.criar(dieta).subscribe(() => {
      alert("Dieta criada com sucesso!");
      this.router.navigate(['/dietas/listar']);
    });
  }

  cancelar() {
    this.router.navigate(['/menu']);
  }
}
