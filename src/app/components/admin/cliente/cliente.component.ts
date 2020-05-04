import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {ClienteService} from '../../../services/cliente.service';
import {Cliente} from '../../../models/cliente.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: Observable<Cliente[]>;
  edit: boolean;
  displayDialogCliente: boolean;
  form: FormGroup;

  constructor(
    private storage: AngularFireStorage,
    private clienteService: ClienteService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.configForm();
    this.recuperarClientes();
  }

  private recuperarClientes() {

    this.clienteService.list(success => {
        this.clientes = (success);
      },
      error => {
        alert('Erro ao listar Clientes');
        return error;
      },
      () => {
      });
  }

  configForm() {
    this.form = this.fb.group({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      cnpj: new FormControl('', Validators.required),
    })
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogCliente = true;
  }

  selecionaCliente(cliente: Cliente) {
    this.edit = true;
    this.displayDialogCliente = true;
    this.form.setValue(cliente);
  }

  save() {
    console.log(this.clienteService);
    this.clienteService.salvar(this.form.value,
      success => {
        alert('Cliente salvo com sucesso.');
      },
      error => {
        alert("Erro ao salvar");
        return error;
      },
      () => {

      });

  }
}
