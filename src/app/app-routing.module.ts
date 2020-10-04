import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin/painel', pathMatch: 'full'  },
  { path: 'login', component: LoginComponent },
  { path: 'admin/painel', loadChildren: () => import('./components/admin/painel/painel.module').then(m => m.PainelModule)},
  { path: 'admin/cliente', loadChildren: () => import('./components/admin/cliente/cliente.module').then(m => m.ClienteModule)},
  { path: 'admin/requisicao', loadChildren: () => import('./components/admin/requisicao/requisicao.module').then(m => m.RequisicaoModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
