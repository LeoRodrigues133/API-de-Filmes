import { Component,  OnInit, Output } from '@angular/core';
import { formatDate, NgFor } from '@angular/common';
import { FilmeService } from '../../services/api.service';
import { ListagemDeFilme } from '../../models/Listagem-de-Filme';
import { LocalStorageService } from '../../services/local-storage.service';
import { CardDeFilmesComponent } from "../shared/movie-card/movie-card.component";
import { PaginationButtonComponent } from "../shared/pagination-button/pagination-button.component";
import { BannerServiceService } from '../../services/banner-service.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [NgFor, CardDeFilmesComponent, PaginationButtonComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit {
  public filmes: ListagemDeFilme[] = [];
  private pagina: number = 1;

  constructor(
    private filmeService: FilmeService,
    private localStorage: LocalStorageService,
    private bannerService: BannerServiceService
  ) {}

  ngOnInit(): void {
    this.loadPopularMovies();
  }

  public loadPopularMovies() {
    this.filmeService.SelectByPopular(this.pagina).subscribe((f) => {

      const resultado = f.results as any[];

      const filmeMapeados = resultado.map((obj) => this.mapearListagemDeFilmes(obj));

      this.bannerService.updateBannerImages(filmeMapeados.map(filme => filme.imagem)); // Update banner images

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
