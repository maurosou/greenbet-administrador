import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContaService } from 'src/app/services/conta.service';

@Component({
	selector: 'app-modal-adicionar-saldo',
	templateUrl: './modal-adicionar-saldo.component.html',
	styleUrls: ['./modal-adicionar-saldo.component.scss'],
})
export class ModalAdicionarSaldoComponent {
	carregando = false;

	valor: number | null = null;

	tipo = 'rendimento';

	constructor(
		public dialogRef: MatDialogRef<ModalAdicionarSaldoComponent>,
		private contaService: ContaService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	fechar() {
		this.dialogRef.close(false);
	}

	salvar() {
		if (this.valor != null) {
			this.carregando = true;
			this.contaService.adicionarSaldo(this.data.id, this.valor, this.tipo).subscribe({
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
