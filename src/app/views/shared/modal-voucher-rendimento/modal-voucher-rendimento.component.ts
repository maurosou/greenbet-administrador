import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContratoService } from '../../../services/contrato.service';

@Component({
	selector: 'app-modal-voucher',
	templateUrl: './modal-voucher-rendimento.component.html',
	styleUrls: ['./modal-voucher-rendimento.component.scss'],
})
export class ModalVoucherRendimentoComponent {
	carregando = false;

	valor = 0;
	contaId = 0;

	constructor(
		public dialogRef: MatDialogRef<ModalVoucherRendimentoComponent>,
		private contratoService: ContratoService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.contaId = data.contaId;
	}

	fechar() {
		this.dialogRef.close(false);
	}

	salvar() {
		this.carregando = true;
		this.contratoService.voucherRendimento(this.valor, this.contaId).subscribe({
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
