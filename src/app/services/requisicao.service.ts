import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/servicefirebase.service';
import { Requisicao } from '../models/requisicao.model';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from "firebase/app";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService  {

  urlRest= 'http://localhost:8080/';

  constructor(
    private _httpClient: HttpClient
  ) {

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
