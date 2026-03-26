import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment-timezone';
import { LogFiltroModel } from 'src/app/models/log-filtro.model';
import { LogModel } from 'src/app/models/log.model';
import { PaginacaoModel } from 'src/app/models/paginacao.model';
import { HelperService } from 'src/app/services/helper.service';
import { LogService } from 'src/app/services/log.service';

@Component({
	selector: 'app-log',
	templateUrl: './log.component.html',
	styleUrls: ['./log.component.scss'],
})
export class LogComponent {
	carregando = false;

	filtro: LogFiltroModel = {
		dataDe: null,
		dataAte: null,
		email: '',
		nome: '',
		pagina: 1,
	};

	lista: PaginacaoModel<LogModel> = {
		lista: [],
		paginaAtual: 1,
		totalPaginas: 1,
		totalRegistro: 0,
	};

	displayedColumns: string[] = ['data', 'usuario', 'tipo', 'descricao', 'objeto'];

	constructor(private logService: LogService, public helper: HelperService) {
		this.filtro.dataDe = moment().startOf('month').toDate();
		this.filtro.dataAte = moment().toDate();
		this.carregar();
	}

	carregar() {
		this.carregando = true;

		var filtro = Object.assign({}, this.filtro);
		filtro.dataDe = this.helper.ajustarFusoHorario(filtro.dataDe);
		filtro.dataAte = this.helper.ajustarFusoHorario(filtro.dataAte);

		this.logService.logar(filtro).subscribe({
			next: (data) => {
				this.lista = data;
				this.carregando = false;
			},
			error: (error) => {
				this.carregando = false;
			},
		});
	}

	buscar() {
		this.filtro.pagina = 1;
		this.carregar();
	}

	alterarPagina(pagina: number) {
		this.filtro.pagina = pagina;
		this.carregar();
	}
}
