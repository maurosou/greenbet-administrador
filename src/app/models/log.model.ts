import { AdministradorListaModel } from './administrador-lista.model';

export interface LogModel {
  id: number;
  usuario: AdministradorListaModel | null;
  tipo: string | null;
  descricao: string | null;
  objeto: string | null;
  data: string | null;
}
