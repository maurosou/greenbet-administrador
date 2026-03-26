import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ContaArvoreModel } from '../models/conta-arvore.model';
import { Observable } from 'rxjs';
import { ContaFiltroAdministradorModel } from '../models/conta-filtro-administrador.models';
import { PaginacaoModel } from '../models/paginacao.model';
import { ContaListaAdministradorModel } from '../models/conta-lista-administrador.model';
import { ContaEditarAdministradorModel } from '../models/conta-editar-administrador.model';
import { ContaStatusEnum } from '../enums/conta-status.enum';
import { AutenticacaoModel } from '../models/autenticacao.model';

@Injectable({
	providedIn: 'root',
})
export class ContaService {
	controller = 'conta';

	constructor(private api: ApiService) { }

	arvore(): Observable<ContaArvoreModel[]> {
		return this.api.get<ContaArvoreModel[]>(`${this.controller}/arvore`);
	}

	lista(filtro: ContaFiltroAdministradorModel): Observable<PaginacaoModel<ContaListaAdministradorModel>> {
		return this.api.post<PaginacaoModel<ContaListaAdministradorModel>>(`${this.controller}/lista`, filtro);
	}

	registro(id: any): Observable<ContaEditarAdministradorModel> {
		return this.api.get<ContaEditarAdministradorModel>(`${this.controller}/${id}`);
	}

	salvar(id: any, model: ContaEditarAdministradorModel): Observable<boolean> {
		return this.api.put<boolean>(`${this.controller}/${id}`, model);
	}

	alterarPatrocinador(id: any, paiId: number): Observable<boolean> {
		return this.api.put<boolean>(`${this.controller}/paiId/${id}`, { paiId: paiId });
	}

	alterarSenha(id: any, senha: string): Observable<boolean> {
		return this.api.put<boolean>(`${this.controller}/senha/${id}`, { senha: senha });
	}

	alterarStatus(id: any, status: ContaStatusEnum): Observable<boolean> {
		return this.api.put<boolean>(`${this.controller}/status/${id}`, { status: status });
	}

	jwt(id: any): Observable<AutenticacaoModel> {
		return this.api.get<AutenticacaoModel>(`${this.controller}/jwt/${id}`);
	}

	total(): Observable<number> {
		return this.api.get<number>(`${this.controller}/total`);
	}

	totalAtivo(): Observable<number> {
		return this.api.get<number>(`${this.controller}/total/ativo`);
	}

	totalInativo(): Observable<number> {
		return this.api.get<number>(`${this.controller}/total/inativo`);
	}

	adicionarSaldo(id: any, valor: number, tipo: string): Observable<boolean> {
		return this.api.post<boolean>(`${this.controller}/adicionar-saldo/${tipo}/${id}`, { valor: valor });
	}

	removerSaldo(id: any, valor: number, tipo: string): Observable<boolean> {
		return this.api.post<boolean>(`${this.controller}/remover-saldo/${tipo}/${id}`, { valor: valor });
	}

	liberarSaque(id: any): Observable<boolean> {
		return this.api.get<boolean>(`${this.controller}/liberar-saque/${id}`);
	}

	bloquearSaque(id: any): Observable<boolean> {
		return this.api.get<boolean>(`${this.controller}/bloquear-saque/${id}`);
	}

	liberarSaqueBonus(id: any): Observable<boolean> {
		return this.api.get<boolean>(`${this.controller}/liberar-saque-bonus/${id}`);
	}

	bloquearSaqueBonus(id: any): Observable<boolean> {
		return this.api.get<boolean>(`${this.controller}/bloquear-saque-bonus/${id}`);
	}
}
