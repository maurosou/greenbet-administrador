import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
	selector: 'app-modal-excluir-admin',
	templateUrl: './modal-excluir-admin.component.html',
	styleUrls: ['./modal-excluir-admin.component.scss'],
})
export class ModalExcluirAdminComponent {
	carregando = false;

	constructor(
		public dialogRef: MatDialogRef<ModalExcluirAdminComponent>,
		private usuarioService: UsuarioService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	fechar() {
		this.dialogRef.close(false);
	}

	salvar() {
		this.carregando = true;
		this.usuarioService.excluir(this.data.id).subscribe({
			next: (data) => {
				this.carregando = false;
				this.dialogRef.close(true);
			},
			error: (error) => {
				this.carregando = false;
			},
		});
	}
}
