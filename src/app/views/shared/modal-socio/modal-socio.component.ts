import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SocioModel } from 'src/app/models/socio.model';
import { SocioService } from 'src/app/services/socio.service';

@Component({
	selector: 'app-modal-socio',
	templateUrl: './modal-socio.component.html',
	styleUrls: ['./modal-socio.component.scss'],
})
export class ModalSocioComponent {
	model: SocioModel = {};

	carregando = false;

	constructor(
		public dialogRef: MatDialogRef<ModalSocioComponent>,
		private socioService: SocioService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		if (data != null) {
			this.model = data;
		}
	}

	fechar() {
		this.dialogRef.close(false);
	}

	salvar() {
		if (this.model!.nome == null || this.model!.nome == '') return;
		if (this.model!.percentual == null) return;
		if (this.model!.carteira == null) return;

		this.carregando = true;
		if (this.model!.id != null) {
			this.socioService.atualizar(this.model!).subscribe({
				next: (data) => {
					this.carregando = false;
					this.dialogRef.close(true);
				},
				error: (error) => {
					this.carregando = false;
				},
			});
		} else {
			this.socioService.adicionar(this.model!).subscribe({
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
}
