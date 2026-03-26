import { TipoSaqueEnum } from './../../../enums/tipo-saque.enum';
import { Component } from '@angular/core';
import { SaqueStatusEnum } from '../../../enums/saque-status.enum';
import { TipoPagamentoEnum } from 'src/app/enums/tipo-pagamento.enum';
import { SaqueFiltroAdministradorModel } from 'src/app/models/saque-filtro-administrador.model';
import { PaginacaoModel } from 'src/app/models/paginacao.model';
import { SaqueListaAdministradorModel } from 'src/app/models/saque-lista-administrador.model';
import { SaqueService } from 'src/app/services/saque.service';
import * as moment from 'moment-timezone';
import { HelperService } from 'src/app/services/helper.service';

@Component({
	selector: 'app-saque',
	templateUrl: './saque.component.html',
	styleUrls: ['./saque.component.scss'],
})
export class SaqueComponent {
	carregando = false;

	status = SaqueStatusEnum;
	tipoPagamento = TipoPagamentoEnum;
	tipoSaque = TipoSaqueEnum;

	filtro: SaqueFiltroAdministradorModel = {
		dataDe: null,
		dataAte: null,
		status: null,
		tipoPagamento: null,
		conta: null,
		tipoSaque: null,
		pagina: 1,
	};

	lista: PaginacaoModel<SaqueListaAdministradorModel> = {
		lista: [],
		paginaAtual: 1,
		totalPaginas: 1,
		totalRegistro: 0,
	};

	displayedColumns: string[] = [
		'id',
		'conta',
		'voucher',
		'status',
		'valor',
		'taxa',
		'valorOriginal',
		'tipoPagamento',
		'receber',
		'data',
		'tipoSaque',
		'acoes',
	];

	pendente = 0;
	pago = 0;
	cancelado = 0;

	constructor(private saqueService: SaqueService, public helper: HelperService) {
		this.filtro.dataDe = moment().startOf('month').toDate();
		this.filtro.dataAte = moment().toDate();
		this.carregar();
	}

	carregar() {
		this.carregando = true;

		this.pendente = 0;
		this.pago = 0;
		this.cancelado = 0;

		var filtro = Object.assign({}, this.filtro);
		filtro.dataDe = this.helper.ajustarFusoHorario(filtro.dataDe);
		filtro.dataAte = this.helper.ajustarFusoHorario(filtro.dataAte);

		this.saqueService.lista(filtro).subscribe({
			next: (data) => {
				this.lista = data;
				this.carregando = false;
			},
			error: (error) => {
				this.carregando = false;
			},
		});

		this.saqueService.totalStatus(SaqueStatusEnum.Pendente, filtro).subscribe((total) => {
			this.pendente = total;
		});

		this.saqueService.totalStatus(SaqueStatusEnum.Pago, filtro).subscribe((total) => {
			this.pago = total;
		});

		this.saqueService.totalStatus(SaqueStatusEnum.Cancelado, filtro).subscribe((total) => {
			this.cancelado = total;
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

	alerarStatus(item: SaqueListaAdministradorModel, status: SaqueStatusEnum) {
		this.carregando = true;
		this.saqueService.status(item.id, status).subscribe(
			() => {
				this.carregar();
			},
			() => {
				this.carregando = false;
			}
		);
	}

	alerarStatusSemPagamento(item: SaqueListaAdministradorModel, status: SaqueStatusEnum) {
		this.carregando = true;
		this.saqueService.statusSemPagamento(item.id, status).subscribe(
			() => {
				this.carregar();
			},
			() => {
				this.carregando = false;
			}
		);	
	}
}
