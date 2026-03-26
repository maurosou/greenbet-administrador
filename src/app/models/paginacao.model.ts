export interface PaginacaoModel<T> {
  lista: T[];
  totalPaginas: number | null;
  totalRegistro: number | null;
  paginaAtual: number | null;
}
