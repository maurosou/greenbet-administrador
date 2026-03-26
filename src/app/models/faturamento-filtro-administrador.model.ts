import { TipoFaturamentoEnum } from '../enums/tipo-faturamento.enum';

export interface FaturamentoFiltroAdministradorModel {
	dataDe: Date | null;
	dataAte: Date | null;
	tipo: TipoFaturamentoEnum | null;
	conta: string | null;
	indicacao: string | null;
	pagina: number;
}
