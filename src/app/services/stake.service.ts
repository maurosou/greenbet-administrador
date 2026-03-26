import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ContratoFiltroAdministradorModel } from '../models/contrato-filtro-administrador.models';
import { Observable } from 'rxjs';
import { PaginacaoModel } from '../models/paginacao.model';
import { ContratoListaAdministradorModel } from '../models/contrato-lista-administrador.model';
import { ContratoStatusEnum } from '../enums/contrato-status.enum';
import { AnualModel } from '../models/anual.model';
import { StakeListaAdministradorModel } from '../models/stake-lista-administrador.model';
import { StakeFiltroAdministradorModel } from '../models/stake-filtro-administrador.models';

@Injectable({
	providedIn: 'root',
})
export class StakeService {
	controller = 'stake';

	constructor(private api: ApiService) { }

	lista(filtro: StakeFiltroAdministradorModel): Observable<PaginacaoModel<StakeListaAdministradorModel>> {
		return this.api.post<PaginacaoModel<StakeListaAdministradorModel>>(`${this.controller}/lista`, filtro);
	}

	status(id: number, status: ContratoStatusEnum): Observable<boolean> {
		return this.api.put<boolean>(`${this.controller}/status/${id}`, { status: status });
	}

	aprovar(id: number): Observable<boolean> {
		return this.api.get<boolean>(`${this.controller}/${id}/aprovar`);
	}

	rejeitar(id: number): Observable<boolean> {
		return this.api.get<boolean>(`${this.controller}/${id}/rejeitar`);
	}

	total(): Observable<number> {
		return this.api.get<number>(`${this.controller}/total`);
	}

	anual(ano: number): Observable<AnualModel> {
		return this.api.get<AnualModel>(`${this.controller}/anual/${ano}`);
	}

	totalStatus(status: ContratoStatusEnum, filtro: ContratoFiltroAdministradorModel): Observable<number> {
		return this.api.post<number>(`${this.controller}/total/${status}`, filtro);
	}

	excluir(id: any): Observable<boolean> {
		return this.api.delete<boolean>(`${this.controller}/${id}`);
	}
}
