import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {ClienteService} from '../../../services/cliente.service';
import {Cliente} from '../../../models/cliente.model';
import Swal from 'sweetalert2';

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
      codigo: new FormControl(),
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

  delete(cliente: Cliente) {
    Swal.fire({
      title: 'Confirma a exclusão do Cliente?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.codigo, success => {
            Swal.fire('Cliente excluído com sucesso!', '', 'success');
            this.recuperarClientes();
          },
          error => {
            alert("Erro ao salvar");
            return error;
          });
      }
    })
  }

  save() {
    this.clienteService.salvar(this.form.value,
      success => {
        Swal.fire('Cliente salvo com Sucesso', 'CLiente salvo com Sucesso', 'success');
        this.displayDialogCliente = false;
        this.recuperarClientes();
      },
      error => {
        this.displayDialogCliente = true;
        Swal.fire('Erro ao salvar o Cliente.', 'Detalhes: ${error}', 'error');
        return error;
      },
      () => {
        this.form.reset();
      });
  }
}
