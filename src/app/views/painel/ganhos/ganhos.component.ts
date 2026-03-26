import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment-timezone';
import { SocioFiltroModel } from 'src/app/models/socio-filtro.model';
import { SocioGanhoModel } from 'src/app/models/socio-ganho.model';
import { SocioService } from 'src/app/services/socio.service';
import { ModalSaqueSocioComponent } from '../../shared/modal-saque-socio/modal-saque-socio.component';
import { SocioSaqueModel } from 'src/app/models/socio-saque.model';
import { SaqueStatusEnum } from 'src/app/enums/saque-status.enum';

@Component({
	selector: 'app-ganhos',
	templateUrl: './ganhos.component.html',
	styleUrls: ['./ganhos.component.scss'],
})
export class GanhosComponent {
	status = SaqueStatusEnum;
	carregando = false;

	filtro: SocioFiltroModel = {
		dataDe: null,
		dataAte: null,
	};

	lista: SocioGanhoModel[] = [];
	saques: SocioSaqueModel[] = [];

	displayedColumns: string[] = ['nome', 'valor', 'acoes'];

	displayedColumns2: string[] = ['nome', 'valor', 'status', 'data', 'admin'];

	constructor(public socioService: SocioService, public dialog: MatDialog) {
		this.carregar();
	}

	carregar() {
		this.carregando = true;
		this.socioService.ganhos(this.filtro).subscribe({
			next: (data) => {
				this.lista = data;
				this.carregando = false;
			},
			error: (error) => {
				this.carregando = false;
			},
		});

		this.socioService.saques(this.filtro).subscribe({
			next: (data) => {
				this.saques = data;
			},
			error: (error) => {},
		});
	}

	enviar(id: number, valor: number) {
		const dialogRef = this.dialog.open(ModalSaqueSocioComponent, {
			data: {
				id,
				valor,
			},
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.carregar();
			}
		});
	}
}
