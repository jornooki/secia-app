import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PainelRoutingModule } from './painel-routing.module';
import { PainelComponent } from './painel.component';
import {ChartModule} from 'primeng/chart';
import {AppComponent} from '../../../app.component';


@NgModule({
  declarations: [PainelComponent],
  imports: [
    CommonModule,
    PainelRoutingModule,
    ChartModule
  ],
  providers: []
})
export class PainelModule { }
