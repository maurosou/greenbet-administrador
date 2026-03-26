import { Injectable } from '@angular/core';
import { environment } from 'src/config';

@Injectable({
	providedIn: 'root',
})
export class HelperService {
	constructor() { }

	ajustarFusoHorario(data: Date | null): Date | null {
		if (data == null) return null;
		let dataCorrigida = new Date(data);
		dataCorrigida.setMinutes(data.getMinutes() - data.getTimezoneOffset());
		return dataCorrigida;
	}

	normalizarData(data: Date | null): Date | null {
		if (data == null) return null;
		return new Date(data.setHours(0, 0, 0, 0));
	}

	imagemExibir(imagem: string | null): string | null {
		if (imagem == null) return null;

		if (imagem.length > 100) return `url(data:image/png;base64,${imagem})`;

		return `url('${environment.urlImagem}${imagem}')`;
	}

	imagemExibirSrc(imagem: string | null): string | null {
		if (imagem == null) return null;

		if (imagem.length > 100) return `data:image/png;base64,${imagem}`;

		return `${environment.urlImagem}${imagem}`;
	}
}
