import {Cliente} from 'src/app/models/cliente.model';
import {ClienteService} from './../../../services/cliente.service';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Requisicao} from 'src/app/models/requisicao.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RequisicaoService} from 'src/app/services/requisicao.service';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.css']
})
export class RequisicaoComponent implements OnInit {

  requisicoes$: Observable<Requisicao[]>;
  edit: boolean;
  displayDialogRequisicao: boolean;
  form: FormGroup;
  funcionarioLogado: Cliente;

  constructor(private requisicaoService: RequisicaoService,
    private auth: AuthenticationService,
    private clienteService: ClienteService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.configForm();
  }

  configForm() {
    this.form = this.fb.group({
      id: new FormControl(),
      destino: new FormControl('', Validators.required),
      solicitante: new FormControl(''),
      dataAbertura: new FormControl(''),
      ultimaAtualizacao: new FormControl(''),
      status: new FormControl(''),
      descricao: new FormControl('', Validators.required),
      movimentacoes: new FormControl('')
    })
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogRequisicao = true;
    this.setValorPadrao();
  }

  setValorPadrao() {
    this.form.patchValue({
      solicitante: this.funcionarioLogado,
      status: 'Aberto',
      dataAbertura: new Date(),
      ultimaAtualizacao: new Date(),
      movimentacoes: []
    })
  }

  selecionaRequisicao(func: Requisicao) {
    this.edit = true;
    this.displayDialogRequisicao = true;
    this.form.setValue(func);
  }

  save() {
  }

  delete(depto: Requisicao) {
  }


}
