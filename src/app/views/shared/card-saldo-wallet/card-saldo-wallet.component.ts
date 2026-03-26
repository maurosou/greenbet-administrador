import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
	selector: 'app-card-saldo-wallet',
	templateUrl: './card-saldo-wallet.component.html',
	styleUrls: ['./card-saldo-wallet.component.scss'],
})
export class CardSaldoWalletComponent {
	carregando = true;

	saldoBNB = 0;
	saldoUSDTBep20 = 0;
	wallet = '';

	constructor(private tokenService: TokenService) {
		this.carregar();
	}

	async carregar() {
		this.carregando = true;
		this.wallet = (await this.tokenService.carteiraUsdtBep20().toPromise())?.carteira ?? '';
		this.saldoBNB = (await this.tokenService.saldoBNB().toPromise()) ?? 0;
		this.saldoUSDTBep20 = (await this.tokenService.saldoUSDTBep20().toPromise()) ?? 0;
		this.carregando = false;
	}
}
