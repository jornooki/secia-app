import {Component, OnInit} from '@angular/core';
import {PainelService} from '../../../services/painel.service';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  data: any;
  prioridades: any;


  constructor(private authServ: AuthenticationService, private painelService: PainelService) {
  }

  ngOnInit() {
    this.recuperarTasks();

  }

  private recuperarTasks() {

    this.painelService.list(this.authServ.getUsuarioLoogado(), success => {
        this.prioridades = (success);
        this.data = {
          labels: ['Urgente', 'Alta', 'Média', 'Baixa'],
          datasets: [
            {
              data: [this.prioridades.quantidadeUrgente, this.prioridades.quantidadeAlta,
                this.prioridades.quantidadeMedia, this.prioridades.quantidadeBaixa],
              backgroundColor: [
                '#FF6384',
                '#FFCE56',
                '#36A2EB',
                '#98ff98'
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#FFCE56',
                '#36A2EB',
                '#98ff98'
              ]
            }]
        };
      },
      error => {
        return error;
      },
      () => {
      });
  }

}
