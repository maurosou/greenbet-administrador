import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {
	ApexAxisChartSeries,
	ApexChart,
	ChartComponent,
	ApexDataLabels,
	ApexYAxis,
	ApexLegend,
	ApexXAxis,
	ApexTooltip,
	ApexTheme,
	ApexGrid,
	ApexPlotOptions,
	ApexFill,
	NgApexchartsModule,
} from 'ng-apexcharts';
import { AnualModel } from 'src/app/models/anual.model';
import { ContratoService } from 'src/app/services/contrato.service';
import { FaturamentoService } from 'src/app/services/faturamento.service';

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	yaxis: ApexYAxis;
	stroke: any;
	theme: ApexTheme;
	tooltip: ApexTooltip;
	dataLabels: ApexDataLabels;
	legend: ApexLegend;
	colors: string[];
	markers: any;
	grid: ApexGrid;
	plotOptions: ApexPlotOptions;
	fill: ApexFill;
	labels: string[];
};

@Component({
	selector: 'app-card-anual',
	templateUrl: './card-anual.component.html',
	styleUrls: ['./card-anual.component.scss'],
})
export class CardAnualComponent {
	@ViewChild('chart') chart: ChartComponent = Object.create(null);
	public columnChartOptions: Partial<ChartOptions> | any;

	faturamento: AnualModel = {
		janeiro: 0,
		fevereiro: 0,
		marco: 0,
		abril: 0,
		maio: 0,
		junho: 0,
		julho: 0,
		agosto: 0,
		setembro: 0,
		outubro: 0,
		novembro: 0,
		dezembro: 0,
	};

	constructor(private contratoService: ContratoService) {
		this.contratoService.anual(new Date().getFullYear()).subscribe((data) => {
			this.faturamento = data;
			//Column chart.
			this.columnChartOptions = {
				series: [
					{
						data: [
							this.faturamento.janeiro,
							this.faturamento.fevereiro,
							this.faturamento.marco,
							this.faturamento.abril,
							this.faturamento.maio,
							this.faturamento.junho,
							this.faturamento.julho,
							this.faturamento.agosto,
							this.faturamento.setembro,
							this.faturamento.outubro,
							this.faturamento.novembro,
							this.faturamento.dezembro,
						],
					},
				],
				chart: {
					fontFamily: 'DM Sans,sans-serif',
					foreColor: '#a1aab2',
					height: 300,
					type: 'bar',
					stacked: true,
					toolbar: {
						show: false,
					},
				},
				plotOptions: {
					bar: {
						columnWidth: '40%',
						barHeight: '40%',
					},
				},
				dataLabels: {
					enabled: false,
				},
				markers: {
					size: 3,
				},
				stroke: {
					curve: 'straight',
					width: '0',
				},
				colors: ['#398bf7'],
				legend: {
					show: true,
				},
				grid: {
					show: true,
					strokeDashArray: 0,
					borderColor: 'rgba(0,0,0,0.1)',
					xaxis: {
						lines: {
							show: true,
						},
					},
					yaxis: {
						lines: {
							show: true,
						},
					},
				},
				xaxis: {
					type: 'category',
					categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Nov', 'Out', 'Dez'],
				},
				tooltip: {
					theme: 'dark',
				},
			};
		});
	}
}
