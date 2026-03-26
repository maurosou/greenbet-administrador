import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-painel-layout',
	templateUrl: './painel-layout.component.html',
	styleUrls: ['./painel-layout.component.scss'],
})
export class PainelLayoutComponent {
	menuAberto = false;
	modoMenu: MatDrawerMode = 'over';

	constructor(public breakpointObserver: BreakpointObserver, private authService: AuthService) {}

	ngOnInit() {
		this.menuAberto = this.breakpointObserver.isMatched('(min-width: 992px)');
		this.modoMenu = this.breakpointObserver.isMatched('(min-width: 992px)') ? 'side' : 'over';
	}

	toggleCollapsed() {
		this.menuAberto = !this.menuAberto;
	}

	foiParaLink() {
		console.log('foi para link');
		if (!this.breakpointObserver.isMatched('(min-width: 992px)')) {
			this.menuAberto = false;
		}
	}
}
