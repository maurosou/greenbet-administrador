import { TipoFaturamentoEnum } from '../enums/tipo-faturamento.enum';

export interface FaturamentoListaAdministradorModel {
	id: number;
	tipo: TipoFaturamentoEnum;
	valor: number;
	contaUsuario: string | null;
	contaNome: string | null;
	contaEmail: string | null;
	indicacaoUsuario: string | null;
	indicacaoNome: string | null;
	indicacaoEmail: string | null;
	nivel: number | null;
	percentual: number | null;
	contratoId: number | null;
	data: string | null;
}
