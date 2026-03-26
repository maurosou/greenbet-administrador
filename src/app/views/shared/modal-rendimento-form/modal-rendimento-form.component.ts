import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment-timezone';
import { RendimentoFormModel } from 'src/app/models/rendimento-form.model';
import { HelperService } from 'src/app/services/helper.service';
import { RendimentoService } from 'src/app/services/rendimento.service';

@Component({
	selector: 'app-modal-rendimento-form',
	templateUrl: './modal-rendimento-form.component.html',
	styleUrls: ['./modal-rendimento-form.component.scss'],
})
export class ModalRendimentoFormComponent {
	carregando = false;

	model: RendimentoFormModel = {};

	constructor(
		public dialogRef: MatDialogRef<ModalRendimentoFormComponent>,
		private rendimentoService: RendimentoService,
		public helper: HelperService
	) {
		this.model.data = moment().toDate();
	}

	fechar() {
		this.dialogRef.close(false);
	}

	salvar() {
		if (!this.model.data) return;

		this.model.data = new Date(this.helper.normalizarData(this.model.data!)!);

		this.carregando = true;

		console.log(this.model);

		this.rendimentoService.novo(this.model).subscribe({
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
