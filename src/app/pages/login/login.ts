import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuarios/usuarios';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent {

  form!: FormGroup;
  erroLogin = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  entrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, senha } = this.form.value;

    this.usuarioService.login(email, senha).subscribe(res => {
      if (res.length > 0) {
        this.erroLogin = false;
        const usuarioId = res[0].id!;
        localStorage.setItem('usuarioId', usuarioId.toString());
        this.router.navigate(['/menu']);
      } else {
        this.erroLogin = true;
      }
    });
  }
}
