import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';

const API_URL = 'http://localhost:8080';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  SESSION_KEY = 'auth_user';

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
  }

  autenticar(email, senha) {

    const login = new HttpParams()
      .set('username', email)
      .set('password', senha)
      .set('grant_type', 'password');


    const headers = {
      'Authorization': 'Basic ' + btoa('secia-web:R--nR^b&#K5mx):Fwe]U0,g(pZiE>]AO%+2<&^$tGj:3T>8&b3B[ri!|8JE4EE))'),
      'Content-type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(API_URL + '/oauth/token', login, { headers: headers })
       .toPromise().then(res => {
         this.salvarToken(res);
         this.salvarUsuarioSessao(email);
       });
  }
  salvarUsuarioSessao(email) {
    sessionStorage.setItem(this.SESSION_KEY, email)
  }

  salvarToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem('token', token.access_token)
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
  }

  login(email: string, senha: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, senha);
  }

  logout(): Promise<void> {
    sessionStorage.removeItem(this.SESSION_KEY);
    return this.afAuth.auth.signOut();
  }

  isUsuarioLogado() {
    let user = sessionStorage.getItem(this.SESSION_KEY)
    if (user === null) {
      return false;
    }
    return true;
  }

  getUsuarioLoogado() {
    let user = sessionStorage.getItem(this.SESSION_KEY)
    if (user === null) {
      return '';
    }
    return user;
  }


  buscarPermissoes(email: string, callbackSuccess: any, callbackError: any) {

    return this.http.get(API_URL + '/user/buscarPermissoes/'+ email) .subscribe(
      (response: any) => {
        callbackSuccess(response);
      },
      error => {
        callbackError(error);
      }
    );
  }
}
