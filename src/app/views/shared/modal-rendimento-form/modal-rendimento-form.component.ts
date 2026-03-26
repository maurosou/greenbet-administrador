import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment-timezone';
import { CasaAposta } from 'src/app/models/casa-aposta.model';
import { RendimentoFormModel } from 'src/app/models/rendimento-form.model';
import { HelperService } from 'src/app/services/helper.service';
import { RendimentoService } from 'src/app/services/rendimento.service';

/** Mesmo catálogo do backend (CasaApostaCatalog). Sempre disponível na abertura do modal. */
const CASAS_FALLBACK: CasaAposta[] = [
	{ codigo: 'bet365', nome: 'Bet365', logoUrl: '' },
	{ codigo: 'betfair', nome: 'Betfair', logoUrl: '' },
	{ codigo: 'betano', nome: 'Betano', logoUrl: '' },
	{ codigo: 'sportingbet', nome: 'Sportingbet', logoUrl: '' },
	{ codigo: 'betway', nome: 'Betway', logoUrl: '' },
	{ codigo: 'pinnacle', nome: 'Pinnacle', logoUrl: '' },
	{ codigo: 'williamhill', nome: 'William Hill', logoUrl: '' },
	{ codigo: 'unibet', nome: 'Unibet', logoUrl: '' },
	{ codigo: 'betsson', nome: 'Betsson', logoUrl: '' },
	{ codigo: '888sport', nome: '888sport', logoUrl: '' },
];

@Component({
	selector: 'app-modal-rendimento-form',
	templateUrl: './modal-rendimento-form.component.html',
	styleUrls: ['./modal-rendimento-form.component.scss'],
})
export class ModalRendimentoFormComponent implements OnInit {
	carregando = false;
	/** Mantido para compatibilidade com o template; lista já vem preenchida — não bloqueia o formulário. */
	carregandoCasas = false;
	casas: CasaAposta[] = [...CASAS_FALLBACK];
	usandoFallbackCasas = false;

	model: RendimentoFormModel = {};

	constructor(
		public dialogRef: MatDialogRef<ModalRendimentoFormComponent>,
		private rendimentoService: RendimentoService,
		public helper: HelperService
	) {
		this.model.data = moment().toDate();
		this.model.casaApostaCodigo = this.casas[0].codigo;
	}

	ngOnInit(): void {
		this.rendimentoService.casasAposta().subscribe({
			next: (lista) => {
				if (lista?.length) {
					this.casas = lista;
					this.usandoFallbackCasas = false;
					if (!this.casas.some((c) => c.codigo === this.model.casaApostaCodigo)) {
						this.model.casaApostaCodigo = this.casas[0].codigo;
					}
				} else {
					this.usandoFallbackCasas = true;
				}
			},
			error: () => {
				this.usandoFallbackCasas = true;
			},
		});
	}

	fechar() {
		this.dialogRef.close(false);
	}

	salvar() {
		if (!this.model.data || this.model.valor == null || !this.model.casaApostaCodigo) return;

		this.model.data = new Date(this.helper.normalizarData(this.model.data)!);

		this.carregando = true;

		this.rendimentoService.novo(this.model).subscribe({
			next: () => {
				this.carregando = false;
				this.dialogRef.close(true);
			},
			error: () => {
				this.carregando = false;
			},
		});
	}
}
