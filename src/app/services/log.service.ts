import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { LogFiltroModel } from '../models/log-filtro.model';
import { LogModel } from '../models/log.model';
import { PaginacaoModel } from '../models/paginacao.model';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  controller = 'log';

  constructor(private api: ApiService) {}

  logar(filtro: LogFiltroModel): Observable<PaginacaoModel<LogModel>> {
    return this.api.post<PaginacaoModel<LogModel>>(
      `${this.controller}`,
      filtro
    );
  }
}
