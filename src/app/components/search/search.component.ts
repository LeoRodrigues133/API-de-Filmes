import { RouterLink } from '@angular/router';
import { formatDate, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ResultadoBuscaDeFilmes } from '../../models/busca-de-filmes';
import { SearchInputComponent } from "../search-input/search-input.component";
import { ListagemDeFilme } from '../../models/Listagem-de-Filme';
import { LocalStorageService } from '../../services/local-storage.service';
import { FilmeService } from '../../services/api.service';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [RouterLink, SearchInputComponent, NgIf, NgFor],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  public resultado?: ResultadoBuscaDeFilmes;
  Busca: string = '';

  constructor(
    private localStorage: LocalStorageService,
    private filmeService:FilmeService
  ) { }

  ngOnInit(): void { }

  public realizarBusca(event: { categoria: string, query: string }) {
    this.Busca = event.query;

    this.filmeService
      .SearchTool(event.categoria, event.query)
      .subscribe((resposta) => {
        this.resultado = this.mapearResultadoBusca(resposta);
      });
  }

  private mapearResultadoBusca(obj: any): ResultadoBuscaDeFilmes {
    return {
      pagina: obj.page,
      quantidadeDePaginas: obj.total_pages,
      quantidadeDeResultados: obj.total_results,
      filmes: obj.results.map((result: any) =>
        this.mapearListagemBusca(result)
      ),
    };
  }

  private mapearListagemBusca(obj: any): ListagemDeFilme {
    return {
      id: obj.id,
      titulo: obj.title,
      lancamento: obj.release_date
        ? formatDate(obj.release_date, 'mediumDate', 'pt-BR')
        : 'Indisponível',
      imagem: 'https://image.tmdb.org/t/p/w300/' + obj.poster_path,
      notaEmPorcentagem: (obj.vote_average * 10),
      favorite_movie: this.localStorage.alreadyFavorito(obj.id),
    };
  }
}
