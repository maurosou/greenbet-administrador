import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
	@Output() foiParaLink = new EventEmitter();

	public menuItems = [
		{
			grupo: 'Menu',
			items: [
				{
					nome: 'Dashboard',
					icone: 'fa-solid fa-gauge',
					url: '/painel/dashboard',
				},
				// {
				// 	nome: 'Criptos',
				// 	icone: 'fa-solid fa-coins',
				// 	url: '/painel/cripto',
				// },
				{
					nome: 'Contratos',
					icone: 'fa-solid fa-money-bill-trend-up',
					url: '/painel/contrato',
				},
				{
					nome: 'Voucher',
					icone: 'fa-solid fa-gift',
					url: '/painel/voucher',
				},
				{
					nome: 'Contas',
					icone: 'fa-solid fa-users',
					url: '/painel/conta',
				},
				{
					nome: 'Saques',
					icone: 'fa-solid fa-money-bill-transfer',
					url: '/painel/saque',
				},
				{
					nome: 'Faturamento',
					icone: 'fa-solid fa-receipt',
					url: '/painel/extrato',
				},
				{
					nome: 'Rede de Afiliados',
					icone: 'fa-solid fa-network-wired',
					url: '/painel/rede',
				},
				{
					nome: 'Ranking',
					icone: 'fa-solid fa-trophy',
					url: '/painel/ranking',
				},
				{
					nome: 'Rendimento',
					icone: 'fa-solid fa-percentage',
					url: '/painel/rendimento',
				},
				// {
				// 	nome: 'Sócios',
				// 	icone: 'fa-solid fa-user-group',
				// 	url: '/painel/socio',
				// },

				// {
				// 	nome: 'Ganhos dos Sócios',
				// 	icone: 'fa-solid fa-coins',
				// 	url: '/painel/ganho',
				// },
			],
		},
		{
			grupo: 'Sistema',
			items: [
				{
					nome: 'Configurações',
					icone: 'fa-solid fa-gear',
					url: '/painel/config',
				},
				{
					nome: 'Logs',
					icone: 'fa-solid fa-rectangle-list',
					url: '/painel/log',
				},
				{
					nome: 'Usuários - Administração',
					icone: 'fa-solid fa-user-shield',
					url: '/painel/usuario',
				},
				{
					nome: 'Segurança',
					icone: 'fa-solid fa-lock',
					url: '/painel/seguranca',
				},
			],
		},
	];

	constructor(public router: Router) { }

	irPara(url: string) {
		this.router.navigate([url]);
		this.foiParaLink.emit();
	}
}
