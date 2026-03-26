import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CasaAposta } from 'src/app/models/casa-aposta.model';
import { RendimentoService } from 'src/app/services/rendimento.service';

@Component({
	selector: 'app-modal-executar-rendimento',
	templateUrl: './modal-executar-rendimento.component.html',
	styleUrls: ['./modal-executar-rendimento.component.scss'],
})
export class ModalExecutarRendimentoComponent implements OnInit {
	casas: CasaAposta[] = [];
	selecionada = '';
	carregando = true;

	constructor(
		private dialogRef: MatDialogRef<ModalExecutarRendimentoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { id: number },
		private rendimentoService: RendimentoService
	) {}

	ngOnInit(): void {
		this.rendimentoService.casasAposta().subscribe({
			next: (c) => {
				this.casas = c;
				this.carregando = false;
			},
			error: () => {
				this.carregando = false;
			},
		});
	}

	fechar() {
		this.dialogRef.close(false);
	}

	confirmar() {
		if (!this.selecionada) return;
		this.rendimentoService.executar(this.data.id, this.selecionada).subscribe({
			next: () => this.dialogRef.close(true),
			error: () => {},
		});
	}
}
