import { SaqueStatusEnum } from '../enums/saque-status.enum';
import { TipoPagamentoEnum } from '../enums/tipo-pagamento.enum';
import { TipoSaqueEnum } from '../enums/tipo-saque.enum';

export interface SaqueFiltroAdministradorModel {
	dataDe: Date | null;
	dataAte: Date | null;
	status: SaqueStatusEnum | null;
	tipoSaque: TipoSaqueEnum | null;
	tipoPagamento: TipoPagamentoEnum | null;
	conta: string | null;
	pagina: number;
}
