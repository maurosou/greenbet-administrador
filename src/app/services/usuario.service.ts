import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AutenticacaoModel } from '../models/autenticacao.model';
import { Observable } from 'rxjs';
import { AdministradorFiltroModel } from '../models/administrador-filtro.model';
import { AdministradorListaModel } from '../models/administrador-lista.model';
import { PaginacaoModel } from '../models/paginacao.model';
import { AdminStatusEnum } from '../enums/admin-status.enum';
import { AdministradorNovoModel } from '../models/administrador-novo.model';

@Injectable({
	providedIn: 'root',
})
export class UsuarioService {
	controller = 'usuario';

	constructor(private api: ApiService) {}

	lista(filtro: AdministradorFiltroModel): Observable<PaginacaoModel<AdministradorListaModel>> {
		return this.api.post<PaginacaoModel<AdministradorListaModel>>(`${this.controller}`, filtro);
	}

	status(id: any, status: AdminStatusEnum): Observable<boolean> {
		return this.api.post<boolean>(`${this.controller}/status/${id}`, {
			status: status,
		});
	}

	novo(model: AdministradorNovoModel): Observable<boolean> {
		return this.api.post<boolean>(`${this.controller}/novo`, model);
	}

	logar(usuario: string, senha: string): Observable<AutenticacaoModel> {
		return this.api.post<AutenticacaoModel>('login', {
			usuario: usuario,
			senha: senha,
		});
	}

	senha(senha: string, confirmarSenha: string): Observable<boolean> {
		return this.api.post<boolean>(`${this.controller}/nova-senha`, {
			senha: senha,
			confirmarSenha: confirmarSenha,
		});
	}

	excluir(id: any): Observable<boolean> {
		return this.api.delete<boolean>(`${this.controller}/${id}`);
	}
}
