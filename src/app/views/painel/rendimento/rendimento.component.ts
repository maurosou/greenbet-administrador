import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RendimentoStatusEnum } from 'src/app/enums/rendimento-status.enum';
import { PaginacaoModel } from 'src/app/models/paginacao.model';
import { RendimentoFiltroModel } from 'src/app/models/rendimento-filtro.model';
import { RendimentoListaModel } from 'src/app/models/rendimento-lista.model';
import { RendimentoService } from 'src/app/services/rendimento.service';
import { ModalRendimentoFormComponent } from '../../shared/modal-rendimento-form/modal-rendimento-form.component';

@Component({
	selector: 'app-rendimento',
	templateUrl: './rendimento.component.html',
	styleUrls: ['./rendimento.component.scss'],
})
export class RendimentoComponent {
	carregando = false;

	status = RendimentoStatusEnum;

	filtro: RendimentoFiltroModel = {
		pagina: 1,
	};

	lista: PaginacaoModel<RendimentoListaModel> = {
		lista: [],
		paginaAtual: 1,
		totalPaginas: 1,
		totalRegistro: 0,
	};

	displayedColumns: string[] = ['data', 'valor', 'quantidadePago', 'status', 'acoes'];

	constructor(private redimentoService: RendimentoService, public dialog: MatDialog) {
		this.carregar();
	}

	carregar() {
		this.carregando = true;
		this.redimentoService.lista(this.filtro).subscribe({
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

	cancelar(item: RendimentoListaModel) {
		item.status = RendimentoStatusEnum.Cancelado;
		this.redimentoService.cancelar(item.id).subscribe();
	}

	executar(item: RendimentoListaModel) {
		item.status = RendimentoStatusEnum.Executando;
		this.redimentoService.executar(item.id).subscribe(
			() => {
				this.carregar();
			}
		);
	}

	novo() {
		const dialogRef = this.dialog.open(ModalRendimentoFormComponent, {});
		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.carregar();
			}
		});
	}
}
