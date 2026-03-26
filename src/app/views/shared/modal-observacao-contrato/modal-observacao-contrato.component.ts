import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ContratoListaAdministradorModel } from 'src/app/models/contrato-lista-administrador.model';
import { ContratoService } from 'src/app/services/contrato.service';

@Component({
	selector: 'app-modal-observacao-contrato',
	standalone: true,
	imports: [CommonModule, FormsModule, MaterialModule],
	templateUrl: './modal-observacao-contrato.component.html',
	styleUrls: ['./modal-observacao-contrato.component.scss'],
})
export class ModalObservacaoContratoComponent {
	carregando = false;
	observacao = '';

	constructor(
		public dialogRef: MatDialogRef<ModalObservacaoContratoComponent>,
		private contratoService: ContratoService,
		private toast: ToastrService,
		@Inject(MAT_DIALOG_DATA) public data: ContratoListaAdministradorModel
	) {
		this.observacao = data?.observacao ?? '';
	}

	fechar() {
		this.dialogRef.close(false);
	}

	salvar() {
		this.carregando = true;
		this.contratoService.atualizarObservacao(this.data.id, this.observacao).subscribe({
			next: () => {
				this.carregando = false;
				this.toast.success('Observação atualizada com sucesso');
				this.dialogRef.close(true);
			},
			error: () => {
				this.carregando = false;
			},
		});
	}
}
