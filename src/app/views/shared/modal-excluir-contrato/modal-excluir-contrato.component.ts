import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContratoService } from 'src/app/services/contrato.service';

@Component({
	selector: 'app-modal-excluir-contrato',
	templateUrl: './modal-excluir-contrato.component.html',
	styleUrls: ['./modal-excluir-contrato.component.scss'],
})
export class ModalExcluirContratoComponent {
	carregando = false;

	constructor(
		public dialogRef: MatDialogRef<ModalExcluirContratoComponent>,
		private contratoService: ContratoService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	fechar() {
		this.dialogRef.close(false);
	}

	salvar() {
		this.carregando = true;
		this.contratoService.excluir(this.data.id).subscribe({
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
