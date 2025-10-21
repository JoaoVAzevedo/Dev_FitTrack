import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  cadastrar() {
    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      alert('Preencha todos os campos!');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    console.log('Usuário cadastrado:');
    console.log('Nome:', this.nome);
    console.log('Email:', this.email);
    console.log('Senha:', this.senha);

    alert('Cadastro realizado com sucesso!');
  }
}

