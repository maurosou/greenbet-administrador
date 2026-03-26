import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SocioService } from 'src/app/services/socio.service';

@Component({
	selector: 'app-modal-excluir-socio',
	templateUrl: './modal-excluir-socio.component.html',
	styleUrls: ['./modal-excluir-socio.component.scss'],
})
export class ModalExcluirSocioComponent {
	carregando = false;

	constructor(
		public dialogRef: MatDialogRef<ModalExcluirSocioComponent>,
		private socioService: SocioService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	fechar() {
		this.dialogRef.close(false);
	}

	salvar() {
		this.carregando = true;
		this.socioService.excluir(this.data.id).subscribe({
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
