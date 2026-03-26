import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
	selector: 'app-seguranca',
	templateUrl: './seguranca.component.html',
	styleUrls: ['./seguranca.component.scss'],
})
export class SegurancaComponent {
	carregando = false;

	senha = '';
	confirmarSenha = '';

	constructor(private usuarioService: UsuarioService, private toast: ToastrService) {}

	salvar() {
		this.carregando = true;
		this.usuarioService.senha(this.senha, this.confirmarSenha).subscribe({
			next: (data) => {
				this.senha = '';
				this.confirmarSenha = '';
				this.carregando = false;
				this.toast.success('Salvo com sucesso!');
			},
			error: (error) => {
				this.carregando = false;
			},
		});
	}
}
