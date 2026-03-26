import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdministradorNovoModel } from 'src/app/models/administrador-novo.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
	selector: 'app-modal-usuario-novo',
	templateUrl: './modal-usuario-novo.component.html',
	styleUrls: ['./modal-usuario-novo.component.scss'],
})
export class ModalUsuarioNovoComponent {
	carregando = false;

	model: AdministradorNovoModel = {
		nome: '',
		email: '',
		usuario: '',
		senha: '',
	};

	constructor(public dialogRef: MatDialogRef<ModalUsuarioNovoComponent>, private usuarioService: UsuarioService, public toast: ToastrService) {}

	fechar() {
		this.dialogRef.close(false);
	}

	salvar() {
		this.carregando = true;
		this.usuarioService.novo(this.model).subscribe({
			next: (data) => {
				this.carregando = false;
				this.dialogRef.close(true);
				this.toast.success('Salvo com sucesso!');
			},
			error: (error) => {
				this.carregando = false;
			},
		});
	}
}
