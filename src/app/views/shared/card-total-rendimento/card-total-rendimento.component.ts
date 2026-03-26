import { Component } from '@angular/core';
import { FaturamentoService } from 'src/app/services/faturamento.service';

@Component({
	selector: 'app-card-total-rendimento',
	templateUrl: './card-total-rendimento.component.html',
	styleUrls: ['./card-total-rendimento.component.scss'],
})
export class CardTotalRendimentoComponent {
	carregando = true;

	total = 0;

	constructor(private faturamentoService: FaturamentoService) {
		this.carregar();
	}

	carregar() {
		this.faturamentoService.totalRendimento().subscribe((total) => {
			this.carregando = false;
			this.total = total;
		});
	}
}
