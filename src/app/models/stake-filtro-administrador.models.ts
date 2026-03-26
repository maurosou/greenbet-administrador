import { ContratoStatusEnum } from '../enums/contrato-status.enum';
import { TipoPagamentoEnum } from '../enums/tipo-pagamento.enum';

export interface StakeFiltroAdministradorModel {
	dataDe: Date | null;
	dataAte: Date | null;
	status: ContratoStatusEnum | null;
	tipoPagamento: TipoPagamentoEnum | null;
	conta: string | null;
	pagina: number;
}
