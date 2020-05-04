import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlRest= 'http://localhost:8080/';
  headers: HttpHeaders;

  constructor(
    private _httpClient: HttpClient
  ) {

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

    this._httpClient.post(this.urlRest + 'clients', cliente, option)
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
