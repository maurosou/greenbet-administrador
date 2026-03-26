import { ContaStatusEnum } from '../enums/conta-status.enum';
import { PinUsuarioEnum } from '../enums/pin-usuario.enum';

export interface ContaFiltroAdministradorModel {
	nome: string | null;
	patrocinador: string | null;
	email: string | null;
	cpf: string | null;
	status: ContaStatusEnum | null;
	tipo: PinUsuarioEnum | null;
	ativo: boolean | null;
	pagina: number;
	minDiretos: number | null;
	maxDiretos: number | null;
}
