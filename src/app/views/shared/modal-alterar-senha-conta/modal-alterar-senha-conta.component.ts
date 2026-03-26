import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContaService } from 'src/app/services/conta.service';

@Component({
	selector: 'app-modal-alterar-senha-conta',
	templateUrl: './modal-alterar-senha-conta.component.html',
	styleUrls: ['./modal-alterar-senha-conta.component.scss'],
})
export class ModalAlterarSenhaContaComponent {
	carregando = false;

	senha = '';

	constructor(public dialogRef: MatDialogRef<ModalAlterarSenhaContaComponent>, public toast: ToastrService, private contaService: ContaService, @Inject(MAT_DIALOG_DATA) public data: any) {}

	fechar() {
		this.dialogRef.close(false);
	}

	salvar() {
		this.carregando = true;
		this.contaService.alterarSenha(this.data.id, this.senha).subscribe({
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
