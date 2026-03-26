import { RendimentoStatusEnum } from '../enums/rendimento-status.enum';
export interface RendimentoListaModel {
	id: number;
	valor: number;
	status: RendimentoStatusEnum;
	data: string;
	quantidadePago: number;
}
