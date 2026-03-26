import { AdminStatusEnum } from '../enums/admin-status.enum';

export interface AdministradorListaModel {
  id: number;
  email: string | null;
  nome: string | null;
  usuario: string | null;
  status: AdminStatusEnum | null;
  leitura: boolean;
}
