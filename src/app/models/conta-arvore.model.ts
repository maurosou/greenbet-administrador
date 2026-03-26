import { ContaStatusEnum } from '../enums/conta-status.enum';

export interface ContaArvoreModel {
	id: number | null;
	paiId: number | null;
	paiNome: string | null;
	paiEmail: string | null;
	paiUsuario: string | null;
	nome: string | null;
	email: string | null;
	usuario: string | null;
	telefone: string | null;
	status: ContaStatusEnum;
	ativo: boolean;
	sub: ContaArvoreModel[] | null;
}
