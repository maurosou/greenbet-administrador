import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SocioModel } from 'src/app/models/socio.model';
import { SocioService } from 'src/app/services/socio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalSocioComponent } from '../../shared/modal-socio/modal-socio.component';
import { ModalExcluirSocioComponent } from '../../shared/modal-excluir-socio/modal-excluir-socio.component';

@Component({
	selector: 'app-socio',
	templateUrl: './socio.component.html',
	styleUrls: ['./socio.component.scss'],
})
export class SocioComponent {
	carregando = false;

	lista: SocioModel[] = [];

	displayedColumns: string[] = ['nome', 'percentual', 'carteira', 'acoes'];

	constructor(public socioService: SocioService, public dialog: MatDialog) {
		this.carregar();
	}

	carregar() {
		this.carregando = true;
		this.socioService.lista().subscribe({
			next: (data) => {
				this.lista = data;
				this.carregando = false;
			},
			error: (error) => {
				this.carregando = false;
			},
		});
	}

	novo() {
		const dialogRef = this.dialog.open(ModalSocioComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.carregar();
			}
		});
	}

	editar(model: SocioModel) {
		const dialogRef = this.dialog.open(ModalSocioComponent, {
			data: model,
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.carregar();
			}
		});
	}

	excluir(item: SocioModel) {
		const dialogRef = this.dialog.open(ModalExcluirSocioComponent, {
			data: item,
		});
		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.carregar();
			}
		});
	}
}
