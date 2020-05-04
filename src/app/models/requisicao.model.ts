import { Model } from '../core/model';



export class Requisicao extends Model {
  //solicitante: Funcionario;
  pt:any;

  data: Date;
  //ultimaAtualizacao: any;
  descricao: string;
  prioridade: string;
  titulo: string;
  codigoCliente: number;
  codigoLocal: number;

  ngOnInit() {
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
      monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
      today: 'Hoje',
      clear: 'limpar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Wk'
    };
  }

}
