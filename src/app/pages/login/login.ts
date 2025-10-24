import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuarios/usuarios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  entrar() {
    if (!this.email || !this.senha) {
      alert('Preencha todos os campos!');
      return;
    }

    const sucesso = this.usuarioService.login(this.email, this.senha);

    if (sucesso) {
      const usuario = this.usuarioService.getUsuarioLogado();
      const nome = usuario?.nome || this.email;;


      alert(`Bem-vindo, ${nome}!`);
      this.router.navigate(['/menu']);
    }
    else {
      alert('Usuário ou senha inválidos!');
    }


  }
}
