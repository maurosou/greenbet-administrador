import { Component } from '@angular/core';
import * as moment from 'moment-timezone';
import { TipoFaturamentoEnum } from 'src/app/enums/tipo-faturamento.enum';
import { FaturamentoFiltroAdministradorModel } from 'src/app/models/faturamento-filtro-administrador.model';
import { FaturamentoListaAdministradorModel } from 'src/app/models/faturamento-lista-administrador.model';
import { PaginacaoModel } from 'src/app/models/paginacao.model';
import { FaturamentoService } from 'src/app/services/faturamento.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
	selector: 'app-extrato',
	templateUrl: './extrato.component.html',
	styleUrls: ['./extrato.component.scss'],
})
export class ExtratoComponent {
	carregando = false;

	tipo = TipoFaturamentoEnum;

	filtro: FaturamentoFiltroAdministradorModel = {
		dataDe: null,
		dataAte: null,
		tipo: null,
		conta: null,
		indicacao: null,
		pagina: 1,
	};

	lista: PaginacaoModel<FaturamentoListaAdministradorModel> = {
		lista: [],
		paginaAtual: 1,
		totalPaginas: 1,
		totalRegistro: 0,
	};

	displayedColumns: string[] = ['id', 'data', 'conta', 'valor', 'tipo', 'indicacao'];

	total = 0;

	constructor(private faturamentoService: FaturamentoService, public helper: HelperService) {
		this.filtro.dataDe = moment().startOf('month').toDate();
		this.filtro.dataAte = moment().toDate();
		this.carregar();
	}

	carregar() {
		this.carregando = true;

		this.total = 0;

		var filtro = Object.assign({}, this.filtro);
		filtro.dataDe = this.helper.ajustarFusoHorario(filtro.dataDe);
		filtro.dataAte = this.helper.ajustarFusoHorario(filtro.dataAte);

		this.faturamentoService.lista(this.filtro).subscribe({
			next: (data) => {
				this.lista = data;
				this.carregando = false;
			},
			error: (error) => {
				this.carregando = false;
			},
		});

		this.faturamentoService.totalLista(this.filtro).subscribe({
			next: (data) => {
				this.total = data;
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
