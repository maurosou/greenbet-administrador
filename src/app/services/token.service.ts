import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { WalletModel } from '../models/wallet.model';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	controller = 'token';

	constructor(private api: ApiService) {}

	carteiraUsdtBep20(): Observable<WalletModel> {
		return this.api.get<WalletModel>(`${this.controller}/carteira-usdt-bep20`);
	}

	saldoBNB(): Observable<number> {
		return this.api.get<number>(`${this.controller}/saldo-bnb`);
	}

	saldoUSDTBep20(): Observable<number> {
		return this.api.get<number>(`${this.controller}/saldo-usdt-bep20`);
	}
}
