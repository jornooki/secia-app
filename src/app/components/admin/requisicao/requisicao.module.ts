import { ComumModule } from 'src/app/modules/comum.module';
import { NgModule } from '@angular/core';
import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [RequisicaoComponent],
  imports: [
    ComumModule,
     RequisicaoRoutingModule,
     NgSelectModule,
     CalendarModule
  ]
})
export class RequisicaoModule { }
