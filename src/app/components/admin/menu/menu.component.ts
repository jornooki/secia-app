import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogado = false;
  usuarioLogado: string = '';

  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit() {
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
