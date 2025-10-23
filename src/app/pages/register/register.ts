import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuarios/usuarios';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [FormsModule, CommonModule, RouterModule],
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {};

  cadastrar() {
    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      alert('Preencha todos os campos!');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const sucesso = this.usuarioService.cadastrarUsuario(this.nome, this.email, this.senha);

    if (sucesso) {
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/login']);
    }
  }

}
