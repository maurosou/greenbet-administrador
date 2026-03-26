import { SaqueStatusEnum } from '../enums/saque-status.enum';
import { TipoPagamentoEnum } from '../enums/tipo-pagamento.enum';
import { TipoSaqueEnum } from '../enums/tipo-saque.enum';

export interface SaqueListaAdministradorModel {
	id: number;
	status: SaqueStatusEnum;
	tipoSaque: TipoSaqueEnum | null;
	recebimento: string | null;
	valor: number;
	taxa: number;
	valorOriginal: number;
	valorBRL: number;
	taxaBRL: number;
	valorOriginalBRL: number;
	contaNome: string | null;
	contaEmail: string | null;
	data: string | null;
	cpf: string | null;
	tipoPagamento: TipoPagamentoEnum | null;
}
