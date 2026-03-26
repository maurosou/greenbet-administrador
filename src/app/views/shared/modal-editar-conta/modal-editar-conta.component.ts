import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContaEditarAdministradorModel } from 'src/app/models/conta-editar-administrador.model';
import { ContaService } from 'src/app/services/conta.service';

@Component({
	selector: 'app-modal-editar-conta',
	templateUrl: './modal-editar-conta.component.html',
	styleUrls: ['./modal-editar-conta.component.scss'],
})
export class ModalEditarContaComponent {
	carregando = false;

	model: ContaEditarAdministradorModel = {
		nome: '',
		email: '',
		usuario: '',
		telefone: '',
	};

	constructor(
		public dialogRef: MatDialogRef<ModalEditarContaComponent>,
		public toast: ToastrService,
		private contaService: ContaService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.carregar();
	}

	carregar() {
		this.carregando = true;
		this.contaService.registro(this.data.id).subscribe({
			next: (data) => {
				this.model = data;
				this.carregando = false;
			},
			error: (error) => {
				this.carregando = false;
			},
		});
	}

	fechar() {
		this.dialogRef.close(false);
	}

	salvar() {
		this.carregando = true;
		this.contaService.salvar(this.data.id, this.model).subscribe({
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
