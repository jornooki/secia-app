import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/servicefirebase.service';
import { Requisicao } from '../models/requisicao.model';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService  {

  constructor() {
  }

}
