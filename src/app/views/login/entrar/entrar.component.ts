import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
	selector: 'app-entrar',
	templateUrl: './entrar.component.html',
	styleUrls: ['./entrar.component.scss'],
})
export class EntrarComponent {
	carregando = false;
	usuario = '';
	senha = '';

	constructor(private usuarioService: UsuarioService, private authService: AuthService) {}

	entrar() {
		if (this.usuario.length > 0 && this.senha.length > 0) {
			this.carregando = true;
			this.usuarioService.logar(this.usuario, this.senha).subscribe({
				next: (data) => {
					this.authService.logar(data.token!);
					this.carregando = false;
				},
				error: (error) => {
					this.carregando = false;
				},
			});
		}
	}
}
