import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService  {

  urlRest:string;

  constructor(
    private _httpClient: HttpClient
  ) {
    this.urlRest = 'https://api-secia.herokuapp.com/'
  }


  list(callbackSuccess: any, callbackError: any, callbackFinally: any): any {

    this._httpClient.get(this.urlRest + 'tasks/findAll')
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

  salvar(requisicao: any, callbackSuccess: any, callbackError: any, callbackFinally: any): any {
    this._httpClient.post(this.urlRest + 'tasks/save/', requisicao)
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
