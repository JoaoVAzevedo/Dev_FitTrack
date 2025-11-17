import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DietasService, Dieta } from '../../../services/dietas';
import { CATEGORIAS_ALIMENTOS } from '../../../shared/categorias-alimentos';

@Component({
  selector: 'app-editar-dieta',
  standalone: true,
  templateUrl: './edit-dietas.html',
  styleUrls: ['./edit-dietas.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditarDietaComponent {
  form!: FormGroup;
  categorias = CATEGORIAS_ALIMENTOS;
  dieta!: Dieta;

  constructor(
    private fb: FormBuilder,
    private dietasService: DietasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      calorias: [0, [Validators.required, Validators.min(50)]],
      alimentosSelecionados: [[]]
    });

    const id = this.route.snapshot.paramMap.get('id')!;
    this.dietasService.buscarPorId(id).subscribe(d => {
      this.dieta = d;
      this.form.patchValue({
        nome: d.nome,
        calorias: d.calorias,
        alimentosSelecionados: d.descricao.split(', ').filter(x => x)
      });
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

    const dietaAtualizada: Dieta = {
      ...this.dieta,
      nome: this.form.value.nome,
      descricao: (this.form.value.alimentosSelecionados || []).join(', '),
      calorias: this.form.value.calorias
    };

    this.dietasService.atualizar(dietaAtualizada).subscribe(() => {
      alert("Dieta atualizada com sucesso!");
      this.router.navigate(['/dietas/listar']);
    });
  }

  cancelar() {
    this.router.navigate(['/dietas/listar']);
  }
}
