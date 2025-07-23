import { Component, Input, OnInit } from '@angular/core';
import { FilmeService } from '../../services/api.service';
import { formatDate, NgFor, NgIf } from '@angular/common';
import { ListagemDeFilme } from '../../models/listagem-de-filmes';
import { LocalStorageService } from '../../services/local-storage.service';
import { CardDeFilmesComponent } from "../shared/card-de-filmes/card-de-filmes.component";

@Component({
  selector: 'app-listagem-de-filmes',
  standalone: true,
  imports: [NgFor, CardDeFilmesComponent],
  templateUrl: './listagem-de-filmes.component.html',
  styleUrl: './listagem-de-filmes.component.scss',
})
export class ListagemDeFilmesComponent implements OnInit {
  public filmes: ListagemDeFilme[] = [];
  private pagina: number = 1;

  constructor(
    private filmeService: FilmeService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.SearchPopularMovies();
  }

  public SearchPopularMovies() {
    this.filmeService.SelectByPopular(this.pagina).subscribe((f) => {

      const resultado = f.results as any[];

      const filmeMapeados = resultado.map((obj) => this.mapearListagemDeFilmes(obj));
      this.filmes.push(...filmeMapeados);
      this.pagina++;
    });
  }

  private mapearListagemDeFilmes(obj: any): ListagemDeFilme {
    return {
      id: obj.id,
      titulo: obj.title,
      lancamento: formatDate(obj.release_date, 'mediumDate', 'pt-BR'),
      imagem: 'https://image.tmdb.org/t/p/w300/' + obj.poster_path,
      notaEmPorcentagem: (obj.vote_average * 10),
      favorite_movie: this.localStorage.alreadyFavorito(obj.id),
    };
  }

}
