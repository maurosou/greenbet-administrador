import { Component } from '@angular/core';
import { ContaService } from 'src/app/services/conta.service';
import { ContratoService } from 'src/app/services/contrato.service';

@Component({
	selector: 'app-card-total-receita',
	templateUrl: './card-total-receita.component.html',
	styleUrls: ['./card-total-receita.component.scss'],
})
export class CardTotalReceitaComponent {
	carregando = true;

	total = 0;

	constructor(private contratoService: ContratoService) {
		this.carregar();
	}

	carregar() {
		this.contratoService.total().subscribe((total) => {
			this.carregando = false;
			this.total = total;
		});
	}
}
