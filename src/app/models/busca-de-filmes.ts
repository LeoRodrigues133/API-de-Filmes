import { ListagemDeFilme } from './listagem-de-filmes';

export interface ResultadoBuscaDeFilmes {
  pagina: number;
  quantidadeDePaginas: number;
  quantidadeDeResultados: number;

  filmes: ListagemDeFilme[];
}
