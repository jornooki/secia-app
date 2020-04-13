import {ComumModule} from './../../../modules/comum.module';
import {NgModule} from '@angular/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {ClienteComponent} from './cliente.component';
import {ClienteRoutingModule} from './cliente-routing.module';

@NgModule({
  declarations: [ClienteComponent],
  imports: [
    ComumModule,
    NgSelectModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
