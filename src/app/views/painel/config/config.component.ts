import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfigFormModel } from 'src/app/models/config-form.model';
import { ConfigService } from 'src/app/services/config.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
	selector: 'app-config',
	templateUrl: './config.component.html',
	styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {
	helper = inject(HelperService);
	carregando = false;

	model: ConfigFormModel = {};

	dias: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

	constructor(private configService: ConfigService, private toast: ToastrService) {
		this.carregar();
	}

	carregar() {
		this.carregando = true;
		this.configService.get().subscribe({
			next: (data) => {
				data.saqueInicio = data.saqueInicio?.substring(0, 5);
				data.saqueInicioBonus = data.saqueInicioBonus?.substring(0, 5);
				data.saqueFim = data.saqueFim?.substring(0, 5);
				data.saqueFimBonus = data.saqueFimBonus?.substring(0, 5);
				this.model = data;
				this.carregando = false;
			},
			error: (error) => {
				this.carregando = false;
			},
		});
	}

	salvar() {
		this.carregando = true;
		this.model.saqueInicio = this.formatTimeTo24HourWithSeconds(this.model.saqueInicio ?? '');
		this.model.saqueInicioBonus = this.formatTimeTo24HourWithSeconds(this.model.saqueInicioBonus ?? '');
		this.model.saqueFim = this.formatTimeTo24HourWithSeconds(this.model.saqueFim ?? '');
		this.model.saqueFimBonus = this.formatTimeTo24HourWithSeconds(this.model.saqueFimBonus ?? '');
		this.configService.post(this.model).subscribe({
			next: (data) => {
				this.toast.success('Salvo com sucesso!');
				this.model.saqueInicio = this.model.saqueInicio?.substring(0, 5);
				this.model.saqueInicioBonus = this.model.saqueInicioBonus?.substring(0, 5);
				this.model.saqueFim = this.model.saqueFim?.substring(0, 5);
				this.model.saqueFimBonus = this.model.saqueFimBonus?.substring(0, 5);
				this.carregando = false;
			},
			error: (error) => {
				this.carregando = false;
			},
		});
	}

	formatTimeTo24HourWithSeconds(time: string): string {
		const amPmMatch = time.match(/(AM|PM)/i);
		const isPM = amPmMatch ? amPmMatch[0].toUpperCase() === 'PM' : false;

		const [hourStr, minuteStr] = time.replace(/(AM|PM)/i, '').split(':');

		let hour = parseInt(hourStr, 10);
		const minute = parseInt(minuteStr, 10);

		// Se é um horário PM e a hora é menor que 12, adicione 12 horas
		if (isPM && hour < 12) {
			hour += 12;
		}

		// Se é um horário AM e a hora é 12, mude para 0
		if (!isPM && hour === 12) {
			hour = 0;
		}

		// Adicionar zero à esquerda se necessário
		const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
		const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;

		return `${formattedHour}:${formattedMinute}:00`;
	}

	isDiaInDiasSaque(dia: number): boolean {
		return this.model.diasSaque ? this.model.diasSaque.includes(dia) : false;
	}

	isDiaInDiasSaqueBonus(dia: number): boolean {
		return this.model.diasSaqueBonus ? this.model.diasSaqueBonus.includes(dia) : false;
	}

	toggleDiaSaque(dia: number) {
		if (this.isDiaInDiasSaque(dia)) {
			const index = this.model.diasSaque!.indexOf(dia);
			this.model.diasSaque!.splice(index, 1);
		} else {
			this.model.diasSaque!.push(dia);
		}
		this.model.diasSaque = [...this.model.diasSaque!];
	}

	toggleDiaSaqueBonus(dia: number) {
		if (this.isDiaInDiasSaqueBonus(dia)) {
			const index = this.model.diasSaqueBonus!.indexOf(dia);
			this.model.diasSaqueBonus!.splice(index, 1);
		} else {
			this.model.diasSaqueBonus!.push(dia);
		}
		this.model.diasSaqueBonus = [...this.model.diasSaqueBonus!];
	}

	onFileChangeBanner1(event: Event): void {
		const input = event.target as HTMLInputElement;
		const file = input?.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = (e: ProgressEvent<FileReader>) => {
				// Verifica se o resultado é uma string e atribui à variável
				this.model.banner1 = (e.target?.result as string).split(
					','
				)[1];
			};

			// Lê o arquivo como uma URL de dados base64
			reader.readAsDataURL(file);
		}
	}

	onFileChangeBanner2(event: Event): void {
		const input = event.target as HTMLInputElement;
		const file = input?.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = (e: ProgressEvent<FileReader>) => {
				// Verifica se o resultado é uma string e atribui à variável
				this.model.banner2 = (e.target?.result as string).split(
					','
				)[1];
			};
			// Lê o arquivo como uma URL de dados base64
			reader.readAsDataURL(file);
		}
	}

	onFileChangeBanner3(event: Event): void {
		const input = event.target as HTMLInputElement;
		const file = input?.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = (e: ProgressEvent<FileReader>) => {
				// Verifica se o resultado é uma string e atribui à variável
				this.model.banner3 = (e.target?.result as string).split(
					','
				)[1];
			};
			// Lê o arquivo como uma URL de dados base64
			reader.readAsDataURL(file);
		}
	}
}
