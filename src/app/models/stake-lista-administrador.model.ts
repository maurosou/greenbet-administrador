import { ContratoStatusEnum } from '../enums/contrato-status.enum';
import { TipoPagamentoEnum } from '../enums/tipo-pagamento.enum';

export interface StakeListaAdministradorModel {
	id: number;
	status: ContratoStatusEnum;
	valor: number;
	valorDolar: number;
	valorBNB: number;
	valorTRX: number;
	comprovante: string | null;
	motivo: string | null;
	contaNome: string | null;
	contaEmail: string | null;
	data: string | null;
	voucher: boolean;
	tipoPagamento: TipoPagamentoEnum;
	paymentId: string | null;
	adminVoucher: string | null;
}
