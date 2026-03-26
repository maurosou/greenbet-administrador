import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RendimentoFiltroModel } from '../models/rendimento-filtro.model';
import { Observable } from 'rxjs';
import { PaginacaoModel } from '../models/paginacao.model';
import { RendimentoListaModel } from '../models/rendimento-lista.model';
import { RendimentoFormModel } from '../models/rendimento-form.model';

@Injectable({
	providedIn: 'root',
})
export class RendimentoService {
	controller = 'rendimento';

	constructor(private api: ApiService) {}

	lista(filtro: RendimentoFiltroModel): Observable<PaginacaoModel<RendimentoListaModel>> {
		return this.api.post<PaginacaoModel<RendimentoListaModel>>(`${this.controller}/lista`, filtro);
	}

	novo(model: RendimentoFormModel): Observable<boolean> {
		return this.api.post<boolean>(`${this.controller}`, model);
	}

	cancelar(id: any): Observable<boolean> {
		return this.api.get<boolean>(`${this.controller}/cancelar/${id}`);
	}

	executar(id: any): Observable<boolean> {
		return this.api.get<boolean>(`${this.controller}/executar/${id}`);
	}
}
