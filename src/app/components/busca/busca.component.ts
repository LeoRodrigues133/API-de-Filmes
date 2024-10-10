import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilmeService } from '../../services/api.service';
import { ResultadoBuscaDeFilmes } from '../../models/busca-de-filmes';
import { ListagemDeFilme } from '../../models/listagem-de-filmes';
import { LocalStorageService } from '../../services/local-storage.service';
import { formatDate, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ListagemDeFilmesComponent } from '../listagem-de-filmes/listagem-de-filmes.component';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss',
})
export class BuscaComponent implements OnInit {
  public categoriaSelecionada: string = 'multi';
  public resultado?: ResultadoBuscaDeFilmes;

  @Output() limparFilmes: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private filmeService: FilmeService,
    private localStorage: LocalStorageService,
  ) {}

  ngOnInit(): void {}

  public busca(categoria: string, query: string) {
    if (query.length > 0) return;

    this.limparFilmes.emit();

    this.filmeService
      .ferramentaDeBusca(categoria, query)
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
      notaEmPorcentagem: (obj.vote_average * 10).toFixed(1),
      favorite_movie: this.localStorage.alreadyFavorito(obj.id),
    };
  }
}
