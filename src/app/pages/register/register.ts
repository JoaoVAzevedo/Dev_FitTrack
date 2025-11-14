import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuarios/usuarios';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator }); // nota: aqui usamos a função abaixo
  }

  // ValidatorFn que marca o control 'confirmarSenha' com { passwordMismatch: true }
  passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const senha = group.get('senha');
    const confirmar = group.get('confirmarSenha');

    if (!senha || !confirmar) {
      return null; // se algum controle não existe, não embaralha a validação
    }

    const isMismatch = senha.value !== confirmar.value;

    // Se há mismatch, adiciona o erro ao control confirmarSenha
    if (isMismatch) {
      // preserva outros erros que possam existir no controlar
      const current = confirmar.errors || {};
      if (!current['passwordMismatch']) {
        confirmar.setErrors({ ...current, passwordMismatch: true });
      }
    } else {
      // limpa somente o erro passwordMismatch, mantendo outros erros se existirem
      if (confirmar.errors && confirmar.errors['passwordMismatch']) {
        const { passwordMismatch, ...rest } = confirmar.errors;
        const hasOther = Object.keys(rest).length > 0;
        confirmar.setErrors(hasOther ? rest : null);
      }
    }

    // retorna validation error para o grupo também (opcional)
    return isMismatch ? { passwordMismatch: true } : null;
  }

  cadastrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      senha: this.form.value.senha
    };

    this.usuarioService.criar(payload).subscribe(() => {
      alert("Usuário cadastrado com sucesso!");
      this.form.reset();
    }, (err) => {
      // trate erros do backend aqui
      console.error(err);
    });
  }
}
