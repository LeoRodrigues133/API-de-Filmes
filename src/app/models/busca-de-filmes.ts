import { ListagemDeFilme } from './Listagem-de-Filme';

export interface ResultadoBuscaDeFilmes {
  pagina: number;
  quantidadeDePaginas: number;
  quantidadeDeResultados: number;

  filmes: ListagemDeFilme[];
}
