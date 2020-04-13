import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {ClienteService} from '../../../services/cliente.service';
import {Cliente} from '../../../models/cliente.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes$: Observable<Cliente[]>;
  edit: boolean;
  displayDialogFuncionario: boolean;
  form: FormGroup;

  //Para upload da foto
  @ViewChild('inputFile', { static: true }) inputFile: ElementRef;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  task: AngularFireUploadTask;
  complete: boolean;

  constructor(
    private storage: AngularFireStorage,
    private clienteService: ClienteService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.clientes$ = this.clienteService.list();
    this.configForm();
  }

  configForm() {
    this.form = this.fb.group({
      id: new FormControl(),
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      funcao: new FormControl(''),
      departamento: new FormControl('', Validators.required),
      foto: new FormControl()
    })
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogFuncionario = true;
  }

  selecionaFuncionario(cliente: Cliente) {
    this.edit = true;
    this.displayDialogFuncionario = true;
    this.form.setValue(cliente);
  }

  save() {
  }


}
