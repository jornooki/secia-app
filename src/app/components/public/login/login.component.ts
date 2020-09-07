import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
// import { OAuthService} from 'angular2-oauth2/oauth-service';

import Swal from 'sweetalert2'
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogado = false;
  email: string;
  senha: string;
  mensagem: string;
  emailEnviado: boolean;
  usuario: any;
  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit() {

    this.isLogado  = this.authServ.isUsuarioLogado();
    if(this.isLogado) {
      this.router.navigate(['/admin/painel'])    }
  }


  logar() {

    try {
      if (this.email == undefined ||
        this.senha == undefined) {
        this.mensagem = 'Usuário ou senha vazios';
        return;
      }

      const body = this.preencherUsuario();
      this.authServ.autenticar(this.email, this.senha).then(() => {
        this.authServ.buscarPermissoes(this.email,success => {
            this.usuario = (success);
            this.router.navigate(['/admin/painel']);
          },
          error => {
            return error;
          });

      })
        .catch(erro => {
          if (erro.error.error_description === 'Bad credentials') {
            this.mensagem = 'Usuário ou senha inválidos';
          } else {
            this.mensagem = 'Erro ao logar. Detalhes: ${erro}';
          }
        });
    } catch (erro) {
      this.mensagem = `Erro ao logar. Detalhes: ${erro}`;
    }
  }

  private preencherUsuario() {
    const body = new HttpParams()
      .set('username', this.email)
      .set('password', this.senha)
      .set('grant_type', 'password');
    return body;
  }

// logar() {
  //   try {
  //     if (this.email == undefined ||
  //       this.senha == undefined) {
  //       this.mensagem = 'Usuário ou senha vazios'
  //       return
  //     }
  //     this.authServ.login(this.email, this.senha)
  //       .then(() => {
  //         this.router.navigate(['/admin/painel'])
  //       })
  //       .catch(erro => {
  //         let detalhes = '';
  //         switch (erro.code) {
  //           case 'auth/user-not-found': {
  //             detalhes = 'Não existe usuário para o email informado';
  //             break;
  //           }
  //           case 'auth/invalid-email': {
  //             detalhes = 'Email inválido';
  //             break;
  //           }
  //           case 'auth/wrong-password': {
  //             detalhes = 'Senha Inválida';
  //             break;
  //           }
  //           default: {
  //             detalhes = erro.message;
  //             break;
  //           }
  //         }
  //         this.mensagem = `Erro ao logar. ${detalhes}`;
  //       });
  //   } catch (erro) {
  //     this.mensagem = `Erro ao logar. Detalhes: ${erro}`;
  //   }
  //
  // }

  async enviaLink() {
    const { value: email } = await Swal.fire({
      title: 'Informe o email cadastrado',
      input: 'email',
      inputPlaceholder: 'email'
    })
    if (email) {
      this.authServ.resetPassword(email)
        .then(() => {
          this.emailEnviado = true;
          this.mensagem = `Email enviado para ${email} com instruções para recuperação.`
        })
        .catch(erro => {
          this.mensagem = `Erro ao localizar o email. Detahes ${erro.message}`
        })
    }
  }

}
