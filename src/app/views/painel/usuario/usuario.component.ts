import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminStatusEnum } from 'src/app/enums/admin-status.enum';
import { AdministradorFiltroModel } from 'src/app/models/administrador-filtro.model';
import { AdministradorListaModel } from 'src/app/models/administrador-lista.model';
import { PaginacaoModel } from 'src/app/models/paginacao.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalUsuarioNovoComponent } from '../../shared/modal-usuario-novo/modal-usuario-novo.component';
import { ModalExcluirAdminComponent } from '../../shared/modal-excluir-admin/modal-excluir-admin.component';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent {
	carregando = false;

	status = AdminStatusEnum;

	filtro: AdministradorFiltroModel = {
		usuario: '',
		email: '',
		nome: '',
		status: null,
		pagina: 1,
	};

	lista: PaginacaoModel<AdministradorListaModel> = {
		lista: [],
		paginaAtual: 1,
		totalPaginas: 1,
		totalRegistro: 0,
	};

	displayedColumns: string[] = ['usuario', 'nome', 'email', 'status', 'acoes'];

	constructor(private usuarioService: UsuarioService, public dialog: MatDialog) {
		this.carregar();
	}

	carregar() {
		this.carregando = true;
		this.usuarioService.lista(this.filtro).subscribe({
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

	alterarStatus(item: AdministradorListaModel, status: AdminStatusEnum) {
		item.status = status;
		this.usuarioService.status(item.id, status).subscribe();
	}

	novo() {
		const dialogRef = this.dialog.open(ModalUsuarioNovoComponent, {});
		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.carregar();
			}
		});
	}

	excluir(item: AdministradorListaModel) {
		const dialogRef = this.dialog.open(ModalExcluirAdminComponent, {
			data: item,
		});
		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.carregar();
			}
		});
	}
}
