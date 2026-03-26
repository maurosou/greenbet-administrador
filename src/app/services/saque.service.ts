import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SaqueListaAdministradorModel } from '../models/saque-lista-administrador.model';
import { PaginacaoModel } from '../models/paginacao.model';
import { Observable } from 'rxjs';
import { SaqueFiltroAdministradorModel } from '../models/saque-filtro-administrador.model';
import { SaqueStatusEnum } from '../enums/saque-status.enum';

@Injectable({
	providedIn: 'root',
})
export class SaqueService {
	controller = 'saque';

	constructor(private api: ApiService) {}

	lista(filtro: SaqueFiltroAdministradorModel): Observable<PaginacaoModel<SaqueListaAdministradorModel>> {
		return this.api.post<PaginacaoModel<SaqueListaAdministradorModel>>(`${this.controller}/lista`, filtro);
	}

	status(id: any, status: any): Observable<boolean> {
		return this.api.put<boolean>(`${this.controller}/status/${id}`, { status: status });
	}

	statusSemPagamento(id: any, status: any): Observable<boolean> {
		return this.api.put<boolean>(`${this.controller}/status/${id}/sem-pagamento`, { status: status });
	}

	totalStatus(status: SaqueStatusEnum, filtro: SaqueFiltroAdministradorModel): Observable<number> {
		return this.api.post<number>(`${this.controller}/total/${status}`, filtro);
	}
}
