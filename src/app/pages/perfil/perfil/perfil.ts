import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgressoService } from '../../../services/progresso.service';
import { Progresso } from '../../../services/progresso.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil-progresso',
  standalone: true,
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class PerfilProgressoComponent {
  form!: FormGroup;
  progressoExistente: Progresso | null = null;
  nomeUsuario: string = '';

  constructor(
    private fb: FormBuilder,
    private progressoService: ProgressoService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      pesoAtual: [null, [Validators.required, Validators.min(30)]],
      metaPeso: [null, [Validators.required, Validators.min(30)]],
      gorduraAtual: [null, [Validators.required, Validators.min(5)]],
      metaGordura: [null, [Validators.required, Validators.min(5)]],
      massaAtual: [null, [Validators.required, Validators.min(10)]],
      metaMassa: [null, [Validators.required, Validators.min(10)]]
    });

    const usuarioId = localStorage.getItem('usuarioId')!;

    // Carrega progresso do usuário
    this.progressoService.listarPorUsuario(usuarioId).subscribe(dados => {
      if (dados) {
        this.progressoExistente = dados;
        this.form.patchValue(dados);
      }
    });

    // Carrega nome do usuário para exibir na caixinha
    this.http.get<any>(`http://localhost:3000/usuarios/${usuarioId}`).subscribe(usuario => {
      this.nomeUsuario = usuario.nome;
    });
  }

  salvar() {
    if (this.form.invalid) return;

    const usuarioId = localStorage.getItem('usuarioId')!;
    const progresso: Progresso = {
      ...this.form.value,
      usuarioId,
      id: this.progressoExistente?.id
    };

    this.progressoService.salvar(progresso).subscribe(() => {
      alert('Progresso atualizado com sucesso!');
    });
  }
}
