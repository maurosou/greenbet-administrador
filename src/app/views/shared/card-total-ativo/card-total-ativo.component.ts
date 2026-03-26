import { Component } from '@angular/core';
import { ContaService } from 'src/app/services/conta.service';

@Component({
	selector: 'app-card-total-ativo',
	templateUrl: './card-total-ativo.component.html',
	styleUrls: ['./card-total-ativo.component.scss'],
})
export class CardTotalAtivoComponent {
	carregando = true;

	total = 0;

	constructor(private contaService: ContaService) {
		this.carregar();
	}

	carregar() {
		this.contaService.totalAtivo().subscribe((total) => {
			this.carregando = false;
			this.total = total;
		});
	}
}
