import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FaturamentoListaAdministradorModel } from '../models/faturamento-lista-administrador.model';
import { FaturamentoFiltroAdministradorModel } from '../models/faturamento-filtro-administrador.model';
import { PaginacaoModel } from '../models/paginacao.model';
import { Observable } from 'rxjs';
import { AnualModel } from '../models/anual.model';

@Injectable({
	providedIn: 'root',
})
export class FaturamentoService {
	controller = 'faturamento';

	constructor(private api: ApiService) {}

	lista(filtro: FaturamentoFiltroAdministradorModel): Observable<PaginacaoModel<FaturamentoListaAdministradorModel>> {
		return this.api.post<PaginacaoModel<FaturamentoListaAdministradorModel>>(`${this.controller}`, filtro);
	}

	totalLista(filtro: FaturamentoFiltroAdministradorModel): Observable<number> {
		return this.api.post<number>(`${this.controller}/total`, filtro);
	}

	excluir(id: any): Observable<boolean> {
		return this.api.delete<boolean>(`${this.controller}/${id}`);
	}

	totalRendimento(): Observable<number> {
		return this.api.get<number>(`${this.controller}/total/rendimento`);
	}

	totalBonus(): Observable<number> {
		return this.api.get<number>(`${this.controller}/total/bonus`);
	}
}
