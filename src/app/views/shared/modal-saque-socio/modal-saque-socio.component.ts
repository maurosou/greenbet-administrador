import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SocioEnvioModel } from 'src/app/models/socio-envio.model';
import { SocioService } from 'src/app/services/socio.service';

@Component({
	selector: 'app-modal-saque-socio',
	templateUrl: './modal-saque-socio.component.html',
	styleUrls: ['./modal-saque-socio.component.scss'],
})
export class ModalSaqueSocioComponent {
	model: SocioEnvioModel = {};

	carregando = false;

	constructor(
		public dialogRef: MatDialogRef<ModalSaqueSocioComponent>,
		private socioService: SocioService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.model.id = data.id;
		this.model.valor = data.valor;
	}

	fechar() {
		this.dialogRef.close(false);
	}

	salvar() {
		this.carregando = true;
		this.socioService.saque(this.model!).subscribe({
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
