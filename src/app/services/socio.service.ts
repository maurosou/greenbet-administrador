import { SocioFiltroModel } from './../models/socio-filtro.model';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SocioModel } from '../models/socio.model';
import { Observable } from 'rxjs';
import { SocioGanhoModel } from '../models/socio-ganho.model';
import { SocioEnvioModel } from '../models/socio-envio.model';
import { SocioSaqueModel } from '../models/socio-saque.model';

@Injectable({
	providedIn: 'root',
})
export class SocioService {
	controller = 'socio';

	constructor(private api: ApiService) {}

	lista(): Observable<SocioModel[]> {
		return this.api.get<SocioModel[]>(`${this.controller}`);
	}

	adicionar(model: SocioModel): Observable<boolean> {
		return this.api.post<boolean>(`${this.controller}`, model);
	}

	atualizar(model: SocioModel): Observable<boolean> {
		return this.api.put<boolean>(`${this.controller}`, model);
	}

	ganhos(model: SocioFiltroModel): Observable<SocioGanhoModel[]> {
		return this.api.post<SocioGanhoModel[]>(`${this.controller}/ganhos`, model);
	}

	saque(model: SocioEnvioModel): Observable<boolean> {
		return this.api.post<boolean>(`${this.controller}/saque`, model);
	}

	saques(model: SocioFiltroModel): Observable<SocioGanhoModel[]> {
		return this.api.post<SocioSaqueModel[]>(`${this.controller}/saques`, model);
	}

	excluir(id: any): Observable<boolean> {
		return this.api.delete<boolean>(`${this.controller}/${id}`);
	}
}
