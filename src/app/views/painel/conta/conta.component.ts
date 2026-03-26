import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContaStatusEnum } from 'src/app/enums/conta-status.enum';
import { ContaFiltroAdministradorModel } from 'src/app/models/conta-filtro-administrador.models';
import { ContaListaAdministradorModel } from 'src/app/models/conta-lista-administrador.model';
import { PaginacaoModel } from 'src/app/models/paginacao.model';
import { ContaService } from 'src/app/services/conta.service';
import { environment } from 'src/config';
import { ModalEditarContaComponent } from '../../shared/modal-editar-conta/modal-editar-conta.component';
import { ModalAlterarSenhaContaComponent } from '../../shared/modal-alterar-senha-conta/modal-alterar-senha-conta.component';
import { ModalAlterarPatrocinadorComponent } from '../../shared/modal-alterar-patrocinador/modal-alterar-patrocinador.component';
import { ModalVoucherComponent } from '../../shared/modal-voucher/modal-voucher.component';
import { ModalVoucherRendimentoComponent } from '../../shared/modal-voucher-rendimento/modal-voucher-rendimento.component';
import { ModalAdicionarSaldoComponent } from '../../shared/modal-adicionar-saldo/modal-adicionar-saldo.component';
import { ModalRemoverSaldoComponent } from '../../shared/modal-remover-saldo/modal-remover-saldo.component';
import { PinUsuarioEnum } from 'src/app/enums/pin-usuario.enum';

@Component({
	selector: 'app-conta',
	templateUrl: './conta.component.html',
	styleUrls: ['./conta.component.scss'],
})
export class ContaComponent {
	carregando = false;

	status = ContaStatusEnum;
	tipo = PinUsuarioEnum;

	filtro: ContaFiltroAdministradorModel = {
		nome: null,
		patrocinador: null,
		status: null,
		ativo: null,
		cpf: null,
		email: null,
		pagina: 1,
		tipo: null,
		minDiretos: null,
		maxDiretos: null,
	};

	lista: PaginacaoModel<ContaListaAdministradorModel> = {
		lista: [],
		paginaAtual: 1,
		totalPaginas: 1,
		totalRegistro: 0,
	};

	displayedColumns: string[] = [
		'id',
		'usuario',
		'status',
		'diretos',
		'telefone',
		'patrocinador',
		'tipo',
		'data',
		'ativo',
		'bloquearSaque',
		'bloquearSaqueBonus',
		'acoes',
	];

	constructor(private contaService: ContaService, public dialog: MatDialog) {
		this.carregar();
	}

	carregar() {
		this.carregando = true;
		this.contaService.lista(this.filtro).subscribe({
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

	alerarStatus(item: ContaListaAdministradorModel, status: ContaStatusEnum) {
		item.status = status;
		this.contaService.alterarStatus(item.id, status).subscribe();
	}

	titularidade(item: ContaListaAdministradorModel) {
		this.carregando = true;

		this.contaService.jwt(item.id).subscribe({
			next: (data) => {
				this.carregando = false;
				window.open(`${environment.urlConta}/login/titularidade/${data.token}`, '_blank');
			},
			error: (error) => {
				this.carregando = false;
			},
		});
	}

	editar(item: ContaListaAdministradorModel) {
		const dialogRef = this.dialog.open(ModalEditarContaComponent, {
			data: { id: item.id },
		});
		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.carregar();
			}
		});
	}

	senha(item: ContaListaAdministradorModel) {
		const dialogRef = this.dialog.open(ModalAlterarSenhaContaComponent, {
			data: { id: item.id },
		});
		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.carregar();
			}
		});
	}

	patrocinador(item: ContaListaAdministradorModel) {
		const dialogRef = this.dialog.open(ModalAlterarPatrocinadorComponent, {
			data: { id: item.id },
		});
		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.carregar();
			}
		});
	}

	voucher(item: ContaListaAdministradorModel) {
		const dialogRef = this.dialog.open(ModalVoucherComponent, {
			data: { contaId: item.id },
		});
		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.carregar();
			}
		});
	}

	voucherRendimento(item: ContaListaAdministradorModel) {
		const dialogRef = this.dialog.open(ModalVoucherRendimentoComponent, {
			data: { contaId: item.id },
		});
		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.carregar();
			}
		});
	}

	adicionarSaldo(item: ContaListaAdministradorModel) {
		const dialogRef = this.dialog.open(ModalAdicionarSaldoComponent, {
			data: { id: item.id },
		});
		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.carregar();
			}
		});
	}

	removerSaldo(item: ContaListaAdministradorModel) {
		const dialogRef = this.dialog.open(ModalRemoverSaldoComponent, {
			data: { id: item.id },
		});
		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.carregar();
			}
		});
	}

	liberarSaque(item: ContaListaAdministradorModel) {
		item.bloquearSaque = false;
		this.contaService.liberarSaque(item.id).subscribe((data) => { });
	}

	bloquearSaque(item: ContaListaAdministradorModel) {
		item.bloquearSaque = true;
		this.contaService.bloquearSaque(item.id).subscribe((data) => { });
	}

	liberarSaqueBonus(item: ContaListaAdministradorModel) {
		item.bloquearSaqueBonus = false;
		this.contaService.liberarSaqueBonus(item.id).subscribe((data) => { });
	}

	bloquearSaqueBonus(item: ContaListaAdministradorModel) {
		item.bloquearSaqueBonus = true;
		this.contaService.bloquearSaqueBonus(item.id).subscribe((data) => { });
	}
}
