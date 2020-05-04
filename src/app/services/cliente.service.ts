import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlRest= 'http://localhost:8080/';
  headers: Headers;


  constructor(
    private _httpClient: HttpClient
  ) {

  }
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  list(callbackSuccess: any, callbackError: any, callbackFinally: any): any {
    const option = {
      headers: this.headers
    };

    this._httpClient.get(this.urlRest + 'clients')
      .subscribe(
        (response: any) => {
          callbackSuccess(response);
          callbackFinally();
        },
        error => {
          callbackError(error);
          callbackFinally();
        }
      );
  }


  salvar(cliente: any, callbackSuccess: any, callbackError: any, callbackFinally: any): any {
    const option = {
      headers: this.headers
    };

    this._httpClient.post(this.urlRest + 'clients', cliente)
      .subscribe(
        (response: any) => {
          callbackSuccess(response);
          callbackFinally();
        },
        error => {
          callbackError(error);
          callbackFinally();
        }
      );
  }

}
