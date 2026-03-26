import { Component, Input } from '@angular/core';
import { ContaArvoreModel } from 'src/app/models/conta-arvore.model';

@Component({
	selector: 'app-item-arvore',
	templateUrl: './item-arvore.component.html',
	styleUrls: ['./item-arvore.component.scss'],
})
export class ItemArvoreComponent {
	@Input() lista: ContaArvoreModel[] = [];

	aberto: { [key: string]: boolean } = {};

	toggleAberto(user: any) {
		const nome = user.nome;
		this.aberto[nome] = !this.aberto[nome];
	}
}
