import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ContratoFiltroAdministradorModel } from '../models/contrato-filtro-administrador.models';
import { Observable } from 'rxjs';
import { PaginacaoModel } from '../models/paginacao.model';
import { ContratoListaAdministradorModel } from '../models/contrato-lista-administrador.model';
import { ContratoStatusEnum } from '../enums/contrato-status.enum';
import { AnualModel } from '../models/anual.model';

@Injectable({
	providedIn: 'root',
})
export class ContratoService {
	controller = 'contrato';

	constructor(private api: ApiService) { }

	lista(filtro: ContratoFiltroAdministradorModel): Observable<PaginacaoModel<ContratoListaAdministradorModel>> {
		return this.api.post<PaginacaoModel<ContratoListaAdministradorModel>>(`${this.controller}/lista`, filtro);
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

	listaVoucher(filtro: ContratoFiltroAdministradorModel): Observable<PaginacaoModel<ContratoListaAdministradorModel>> {
		return this.api.post<PaginacaoModel<ContratoListaAdministradorModel>>(`${this.controller}/lista/voucher`, filtro);
	}

	voucher(valor: number, contaId: number): Observable<boolean> {
		return this.api.post<boolean>(`${this.controller}/voucher`, { valor: valor, contaId: contaId });
	}

	voucherRendimento(valor: number, contaId: number): Observable<boolean> {
		return this.api.post<boolean>(`${this.controller}/voucher/rendimento`, { valor: valor, contaId: contaId });
	}

	excluir(id: any): Observable<boolean> {
		return this.api.delete<boolean>(`${this.controller}/${id}`);
	}

	totalReinvestir(filtro: ContratoFiltroAdministradorModel): Observable<number> {
		return this.api.post<number>(`${this.controller}/total/reinvestir`, filtro);
	}

	atualizarObservacao(id: number, observacao: string): Observable<boolean> {
		return this.api.put<boolean>(`${this.controller}/observacao/${id}`, { observacao: observacao });
	}
}
