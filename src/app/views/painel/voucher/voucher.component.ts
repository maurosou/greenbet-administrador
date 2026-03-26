import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment-timezone';
import { ContratoStatusEnum } from 'src/app/enums/contrato-status.enum';
import { TipoPagamentoEnum } from 'src/app/enums/tipo-pagamento.enum';
import { ContratoFiltroAdministradorModel } from 'src/app/models/contrato-filtro-administrador.models';
import { ContratoListaAdministradorModel } from 'src/app/models/contrato-lista-administrador.model';
import { PaginacaoModel } from 'src/app/models/paginacao.model';
import { ContratoService } from 'src/app/services/contrato.service';
import { HelperService } from 'src/app/services/helper.service';
import { ModalExcluirContratoComponent } from '../../shared/modal-excluir-contrato/modal-excluir-contrato.component';

@Component({
	selector: 'app-voucher',
	templateUrl: './voucher.component.html',
	styleUrls: ['./voucher.component.scss'],
})
export class VoucherComponent {
	carregando = false;

	status = ContratoStatusEnum;
	tipoPagamento = TipoPagamentoEnum;

	filtro: ContratoFiltroAdministradorModel = {
		dataDe: null,
		dataAte: null,
		status: null,
		tipoPagamento: null,
		conta: null,
		pagina: 1,
	};

	lista: PaginacaoModel<ContratoListaAdministradorModel> = {
		lista: [],
		paginaAtual: 1,
		totalPaginas: 1,
		totalRegistro: 0,
	};

	displayedColumns: string[] = ['id', 'conta', 'status', 'valor', 'data', 'admin', 'acoes'];

	constructor(private contratoService: ContratoService, public dialog: MatDialog, public helper: HelperService) {
		this.filtro.dataDe = moment().startOf('month').toDate();
		this.filtro.dataAte = moment().toDate();
		this.carregar();
	}

	carregar() {
		this.carregando = true;

		var filtro = Object.assign({}, this.filtro);
		filtro.dataDe = this.helper.ajustarFusoHorario(filtro.dataDe);
		filtro.dataAte = this.helper.ajustarFusoHorario(filtro.dataAte);

		this.contratoService.listaVoucher(filtro).subscribe({
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

	excluir(item: ContratoListaAdministradorModel) {
		const dialogRef = this.dialog.open(ModalExcluirContratoComponent, {
			data: item,
		});
		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.carregar();
			}
		});
	}
}
