import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';

const API_URL = 'http://localhost:8080';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
    this.user = afAuth.authState;
  }

  authenticate(login) {

    const headers = {
      'Authorization': 'Basic ' + btoa('secia-web:R--nR^b&#K5mx):Fwe]U0,g(pZiE>]AO%+2<&^$tGj:3T>8&b3B[ri!|8JE4EE))'),
      'Content-type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(API_URL + '/oauth/token', login, { headers: headers })
       .pipe(tap(res => {
       console.log("autenticado");
       }));
  }

  saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
  //  Cookie.set("access_token", token.access_token, expireDate);
    console.log('Obtained Access token');
    window.location.href = 'http://localhost:8089';
  }


  // getResource(resourceUrl) : Observable<any>{
  //   var headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+Cookie.get('access_token')});
  //   return this.http.get(resourceUrl,{ headers: headers })
  //     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  // }

  // checkCredentials(){
  //   return Cookie.check('access_token');
  // }
  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
  }

  authUser(): Observable<firebase.User> {
    return this.user;
  }

  login(email: string, senha: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, senha);
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

}
