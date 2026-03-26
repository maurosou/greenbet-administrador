import { Component } from '@angular/core';
import { ContaService } from 'src/app/services/conta.service';

@Component({
	selector: 'app-card-total-inativo',
	templateUrl: './card-total-inativo.component.html',
	styleUrls: ['./card-total-inativo.component.scss'],
})
export class CardTotalInativoComponent {
	carregando = true;

	total = 0;

	constructor(private contaService: ContaService) {
		this.carregar();
	}

	carregar() {
		this.contaService.totalInativo().subscribe((total) => {
			this.carregando = false;
			this.total = total;
		});
	}
}
