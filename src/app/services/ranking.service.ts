import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { PaginacaoModel } from '../models/paginacao.model';
import { UsuarioValorModel } from '../models/usuario-valor.model';

@Injectable({
	providedIn: 'root',
})
export class RankingService {
	private controller = 'ranking';

	constructor(private api: ApiService) {}

	patrimonio(pagina: number = 1): Observable<PaginacaoModel<UsuarioValorModel>> {
		return this.api.post<PaginacaoModel<UsuarioValorModel>>(`${this.controller}/patrimonio`, { pagina });
	}

	indicacaoDireta(pagina: number = 1): Observable<PaginacaoModel<UsuarioValorModel>> {
		return this.api.post<PaginacaoModel<UsuarioValorModel>>(`${this.controller}/direto`, { pagina });
	}

	volumeRede(pagina: number = 1): Observable<PaginacaoModel<UsuarioValorModel>> {
		return this.api.post<PaginacaoModel<UsuarioValorModel>>(`${this.controller}/rede`, { pagina });
	}
}
