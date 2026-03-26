import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ContaArvoreModel } from 'src/app/models/conta-arvore.model';
import { ContaService } from 'src/app/services/conta.service';

@Component({
	selector: 'app-rede',
	templateUrl: './rede.component.html',
	styleUrls: ['./rede.component.scss'],
})
export class RedeComponent {
	carregando = false;

	lista: ContaArvoreModel[] = [];

	constructor(private contaService: ContaService) {
		this.carregar();
	}

	carregar() {
		this.carregando = true;
		this.contaService.arvore().subscribe({
			next: (data) => {
				this.lista = data;
				this.carregando = false;
			},
			error: (error) => {
				this.carregando = false;
			},
		});
	}
}
