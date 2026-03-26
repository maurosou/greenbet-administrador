import { Component } from '@angular/core';
import { ContaService } from 'src/app/services/conta.service';

@Component({
	selector: 'app-card-total-usuario',
	templateUrl: './card-total-usuario.component.html',
	styleUrls: ['./card-total-usuario.component.scss'],
})
export class CardTotalUsuarioComponent {
	carregando = true;

	total = 0;

	constructor(private contaService: ContaService) {
		this.carregar();
	}

	carregar() {
		this.contaService.total().subscribe((total) => {
			this.carregando = false;
			this.total = total;
		});
	}
}
