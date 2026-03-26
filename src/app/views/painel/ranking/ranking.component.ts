import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PaginacaoModel } from 'src/app/models/paginacao.model';
import { UsuarioValorModel } from 'src/app/models/usuario-valor.model';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
	selector: 'app-ranking',
	templateUrl: './ranking.component.html',
	styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent {
	carregando = false;

	patrimonio: PaginacaoModel<UsuarioValorModel> = {
		lista: [],
		paginaAtual: 1,
		totalPaginas: 1,
		totalRegistro: 0,
	};

	indicacaoDireta: PaginacaoModel<UsuarioValorModel> = {
		lista: [],
		paginaAtual: 1,
		totalPaginas: 1,
		totalRegistro: 0,
	};

	volumeRede: PaginacaoModel<UsuarioValorModel> = {
		lista: [],
		paginaAtual: 1,
		totalPaginas: 1,
		totalRegistro: 0,
	};

	displayedColumns: string[] = ['posicao', 'conta', 'valor'];

	constructor(private rankingService: RankingService) {
		this.carregar();
	}

	carregar() {
		this.carregando = true;

		forkJoin({
			patrimonio: this.rankingService.patrimonio(1),
			indicacaoDireta: this.rankingService.indicacaoDireta(1),
			volumeRede: this.rankingService.volumeRede(1),
		}).subscribe({
			next: (data) => {
				this.patrimonio = data.patrimonio;
				this.indicacaoDireta = data.indicacaoDireta;
				this.volumeRede = data.volumeRede;
				this.carregando = false;
			},
			error: () => {
				this.carregando = false;
			},
		});
	}
}
