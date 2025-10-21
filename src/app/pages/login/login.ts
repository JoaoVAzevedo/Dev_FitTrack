import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  nome: string = '';
  senha: string = '';

  entrar() {
    if (!this.nome || !this.senha) {
      alert('Preencha todos os campos!');
      return;
    }

    alert(`Bem-vindo, ${this.nome}!`);
  }
}
