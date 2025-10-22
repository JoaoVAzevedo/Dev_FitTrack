import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private usuariosKey = 'usuarios'; // chave usada no localStorage
  private usuarioLogadoKey = 'usuarioLogado';

  constructor() {
    // cria a lista no localStorage se ainda não existir
    if (!localStorage.getItem(this.usuariosKey)) {
      localStorage.setItem(this.usuariosKey, JSON.stringify([]));
    }
  }

  // --- Cadastrar usuário ---
  cadastrarUsuario(nome: string, email: string, senha: string): boolean {
    const usuarios = this.listarUsuarios();

    if (usuarios.some((u: { nome: string; email: string; senha: string }) => u.email === email)) {
      alert('Esse email já está cadastrado!');
      return false;
    }

    const novoUsuario = { nome, email, senha };
    usuarios.push(novoUsuario);

    localStorage.setItem(this.usuariosKey, JSON.stringify(usuarios));

    console.log('Usuário cadastrado:', novoUsuario);
    return true;
  }

  // --- Login ---
  login(email: string, senha: string): boolean {
    const usuarios = this.listarUsuarios();
    const usuario = usuarios.find((u: { email: string; senha: string; }) => u.email === email && u.senha === senha);

    if (usuario) {
      localStorage.setItem(this.usuarioLogadoKey, JSON.stringify(usuario));
      console.log('Login realizado:', usuario);
      return true;
    }

    return false;
  }


  logout() {
    localStorage.removeItem(this.usuarioLogadoKey);
  }


  getUsuarioLogado() {
    const usuario = localStorage.getItem(this.usuarioLogadoKey);
    return usuario ? JSON.parse(usuario) : null;
  }


  listarUsuarios() {
    return JSON.parse(localStorage.getItem(this.usuariosKey) || '[]');
  }
}
