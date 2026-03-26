import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginacaoModel } from 'src/app/models/paginacao.model';

@Component({
	selector: 'app-paginacao',
	templateUrl: './paginacao.component.html',
	styleUrls: ['./paginacao.component.scss'],
})
export class PaginacaoComponent implements OnInit {
	@Input() lista!: PaginacaoModel<any>;
	@Input() pagina: number = 0;
	@Output() alterarPaginaEvent = new EventEmitter<number>();
	paginas: number[] = [];

	ngOnInit() {
		this.paginas = Array.from({ length: this.lista.totalPaginas ?? 0 }, (_, i) => i + 1);
	}

	irPagina(pagina: number) {
		this.pagina = pagina;
		this.alterarPaginaEvent.emit(pagina);
		console.log(this.pagina);
	}

	proxima() {
		this.irPagina(this.pagina + 1);
	}

	anterior() {
		this.irPagina(this.pagina - 1);
	}
}
