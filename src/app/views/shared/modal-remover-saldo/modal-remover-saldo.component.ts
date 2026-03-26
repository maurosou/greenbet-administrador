import { Component, Inject } from '@angular/core';
import { ModalAdicionarSaldoComponent } from '../modal-adicionar-saldo/modal-adicionar-saldo.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContaService } from 'src/app/services/conta.service';

@Component({
	selector: 'app-modal-remover-saldo',
	templateUrl: './modal-remover-saldo.component.html',
	styleUrls: ['./modal-remover-saldo.component.scss'],
})
export class ModalRemoverSaldoComponent {
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
			this.contaService.removerSaldo(this.data.id, this.valor, this.tipo).subscribe({
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
