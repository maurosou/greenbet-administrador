import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContaService } from 'src/app/services/conta.service';

@Component({
	selector: 'app-modal-alterar-patrocinador',
	templateUrl: './modal-alterar-patrocinador.component.html',
	styleUrls: ['./modal-alterar-patrocinador.component.scss'],
})
export class ModalAlterarPatrocinadorComponent {
	carregando = false;

	paiId: number | null = null;

	constructor(public dialogRef: MatDialogRef<ModalAlterarPatrocinadorComponent>, public toast: ToastrService, private contaService: ContaService, @Inject(MAT_DIALOG_DATA) public data: any) {}

	fechar() {
		this.dialogRef.close(false);
	}

	salvar() {
		if (this.paiId != null) {
			this.carregando = true;
			this.contaService.alterarPatrocinador(this.data.id, this.paiId).subscribe({
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
}
