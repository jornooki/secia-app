import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogado = false;
  usuarioLogado: string = '';
  mostrarMenu: boolean = false;
  user: Observable<firebase.User>;

  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit() {
    // this.user = this.authServ.authUser();
    this.isLogado = this.authServ.isUsuarioLogado();
    this.authServ.usuarioLogadoEmitter.subscribe(
      usuario => this.usuarioLogado = usuario);
    this.authServ.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar);
    if(!this.isLogado) {
      this.router.navigateByUrl('login');
    }
  }

  sair() {
    this.authServ.logout().then(() => this.router.navigate(['/']));
  }

}
