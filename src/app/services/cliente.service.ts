import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlRest:string;

  constructor(
    private _httpClient: HttpClient
  ) {
    this.urlRest = '${environment.apiUrl}'
  }

  list(callbackSuccess: any, callbackError: any, callbackFinally: any): any {

    this._httpClient.get(this.urlRest + 'clients/findAll')
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

    this._httpClient.post(this.urlRest + 'clients/save/', cliente)
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

  delete(codigo: any, callbackSuccess: any, callbackError: any) {
    this._httpClient.delete(this.urlRest + 'clients/delete/' + codigo)
      .subscribe(
        (response: any) => {
          callbackSuccess(response);
        },
        error => {
          callbackError(error);
        }
      );
  }
}
