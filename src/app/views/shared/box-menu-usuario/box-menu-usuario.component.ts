import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-box-menu-usuario',
  templateUrl: './box-menu-usuario.component.html',
  styleUrls: ['./box-menu-usuario.component.scss'],
})
export class BoxMenuUsuarioComponent {
  id = '';
  nome = '';
  usuario = '';

  constructor(private authService: AuthService, private router: Router) {
    this.id = this.authService.id;
    this.nome = this.authService.nome;
    this.usuario = this.authService.login;
  }

  sair() {
    this.authService.sair();
    this.router.navigate(['/login']);
  }
}
