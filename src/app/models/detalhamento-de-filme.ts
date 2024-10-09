import { elencoFilme } from './elenco-do-filme';
import { videoFilme } from './video-filme';

export interface detalhamentoDeFilme {
  id: number;
  title: string;
  sinopse: string;
  lancamento: string;
  image: string;
  notaEmPorcentagem: string;
  imagemBackgroud: string;
  budget: string;
  video: videoFilme[];
  elenco: elencoFilme[];
  tagline: string;
  genres: string;
  production_companies: string;
  favorite_movie:boolean;
}
