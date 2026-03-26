import { AdminStatusEnum } from '../enums/admin-status.enum';

export interface AdministradorFiltroModel {
  usuario: string | null;
  email: string | null;
  nome: string | null;
  status: AdminStatusEnum | null;
  pagina: number;
}
