import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PainelService {

  urlRest:string;

  constructor(
    private _httpClient: HttpClient
  ) {
      this.urlRest = 'https://api-secia.herokuapp.com/'
  }

  list(email: any,  callbackSuccess: any, callbackError: any, callbackFinally: any): any {

    this._httpClient.get(this.urlRest + 'tasks/findPriorities/'+ email)
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
