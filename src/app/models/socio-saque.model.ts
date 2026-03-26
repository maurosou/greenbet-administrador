import { SaqueStatusEnum } from '../enums/saque-status.enum';

export interface SocioSaqueModel {
	id?: number;
	admin?: string;
	nome?: string;
	valor?: number;
	status?: SaqueStatusEnum;
	data?: string;
}
