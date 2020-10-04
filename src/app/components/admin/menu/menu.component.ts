import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogado = false;
  usuarioLogado: string = '';
  user: Observable<firebase.User>;

  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit() {
   // this.user = this.authServ.authUser();
    this.isLogado = this.authServ.isUsuarioLogado();
    this.usuarioLogado = this.authServ.getUsuarioLoogado();

    if(!this.isLogado) {
      this.router.navigateByUrl('login');
    }
  }

  sair() {
    this.authServ.logout().then(() => this.router.navigate(['/']));
  }


}
