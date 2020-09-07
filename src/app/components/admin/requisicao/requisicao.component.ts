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


  requisicao$: Observable<Requisicao[]>;
  requisicaoSelecionada: Requisicao = new Requisicao();
  edit: boolean;
  displayDialogRequisicao: boolean;
  form: FormGroup;
  usuarioLogado = this.auth.getUsuarioLoogado();
  listaStatus: string[];
  listaPrioridades: string[];
  listaClientes: Cliente[];
  pt: any;

  constructor(private requisicaoService: RequisicaoService,
    private auth: AuthenticationService,
    private clienteService: ClienteService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };

    this.configForm();
    this.carregaStatus();
    this.carregaPrioridades();
    this.recuperarClientes();

  }

  configForm() {
    this.form = this.fb.group({
      codigo: new FormControl(),
      titulo: new FormControl('', Validators.required),
      data: new FormControl(''),
      dataPrevisaoAtendimento: new FormControl(''),
      prioridade: new FormControl(''),
      status: new FormControl(''),
      cliente: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
    })
  }

  carregaStatus() {
    this.listaStatus = ['ABERTO', 'FECHADA'];
  }

  carregaPrioridades() {
    this.listaPrioridades = ['URGENTE', 'ALTA', 'MÉDIA', 'BAIXA'];
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogRequisicao = true;
    this.setValorPadrao();
  }

  setValorPadrao() {
    this.form.patchValue({
      solicitante: this.usuarioLogado,
      status: 'Aberto',
      dataAbertura: new Date(),
      ultimaAtualizacao: new Date(),
    })
  }

  selecionaRequisicao(func: Requisicao) {
    this.edit = true;
    this.displayDialogRequisicao = true;
    this.form.setValue(func);
  }

  save() {
    this.popularRequisicao(this.form.value)
    this.requisicaoService.salvar(this.requisicaoSelecionada,
      success => {
        Swal.fire('Cliente salvo com Sucesso', 'CLiente salvo com Sucesso', 'success');
        this.displayDialogRequisicao = false;
       // this.recuperarClientes();
      },
      error => {
        this.displayDialogRequisicao = true;
        Swal.fire('Erro ao salvar o Cliente.', 'Detalhes: ${error}', 'error');
        return error;
      },
      () => {
        this.form.reset();
      });
  }

  delete(depto: Requisicao) {
  }

  private recuperarClientes() {

    this.clienteService.list(success => {
        this.listaClientes = (success);
      },
      error => {
        alert('Erro ao listar Clientes');
        return error;
      },
      () => {
      });
  }

  private popularRequisicao(value: any) {
    this.requisicaoSelecionada.descricao = value.descricao;
    this.requisicaoSelecionada.cliente = value.cliente;
    this.requisicaoSelecionada.codigoLocal = 10;
    this.requisicaoSelecionada.data = new Date();
    this.requisicaoSelecionada.prioridade = value.prioridade;
    this.requisicaoSelecionada.status = value.status;
    this.requisicaoSelecionada.titulo = value.titulo;

  }
}
