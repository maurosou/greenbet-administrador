import { ContaStatusEnum } from '../enums/conta-status.enum';
import { PinUsuarioEnum } from '../enums/pin-usuario.enum';

export interface ContaListaAdministradorModel {
	id: number;
	nome: string | null;
	usuario: string | null;
	telefone: string | null;
	email: string | null;
	cpf: string | null;
	patrocinadorId: number | null;
	patrocinadorNome: string | null;
	patrocinadorUsuario: string | null;
	patrocinadorEmail: string | null;
	status: ContaStatusEnum | null;
	tipo: PinUsuarioEnum | null;
	dataCadastro: string | null;
	ativo: boolean;
	bloquearSaque: boolean;
	bloquearSaqueBonus: boolean;
}
