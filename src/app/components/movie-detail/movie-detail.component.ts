import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { videoFilme } from '../../models/video-filme';
import { generoFilme } from '../../models/genero-filme';
import { DomSanitizer } from '@angular/platform-browser';
import { FilmeService } from '../../services/api.service';
import { elencoFilme } from '../../models/elenco-do-filme';
import { formatDate, NgFor, NgIf } from '@angular/common';
import { detalhamentoDeFilme } from '../../models/detalhamento-de-filme';
import { LocalStorageService } from '../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhamento-de-filmes',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class DetalhamentoDeFilmesComponent {
  public detalhes?: detalhamentoDeFilme;

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private filmeService: FilmeService,
    private domSanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (!id) {
      throw new Error('Não foi possivel carregar informações sobre o filme.');
    }

    this.filmeService.DetailMovieById(id).subscribe((f) => {
      this.detalhes = this.mapearDetalhamentoDeFilme(f);

      console.log(f);
    });
  }

  public changeStatusFavorito(id: number) {
    if (!this.detalhes) return;

    if (this.localStorageService.alreadyFavorito(id)) {

      this.detalhes.favorite_movie = false;

      this.localStorageService.removeFavorito(id);
      this.showAlert('Filme removido dos favoritos!', 'Removido', 'success');
    } else {
      this.detalhes.favorite_movie = true;

      this.localStorageService.saveFavoritos(id);
      this.showAlert('Filme adicionado aos favoritos!', 'Adicionado', 'success');
    }

  }

  private showAlert(message: string, title: string, type: 'success' | 'error' = 'success') {
    if (type === 'success') {
      this.toastr.success(message, title);
    } else {
      this.toastr.error(message, title);

    }
  }

  private mapearDetalhamentoDeFilme(obj: any): detalhamentoDeFilme {
    return {
      id: obj.id,
      title: obj.title,
      sinopse: obj.overview,
      lancamento: formatDate(obj.release_date, 'mediumDate', 'pt-BR'),
      notaEmPorcentagem: (obj.vote_average * 10).toFixed(1),
      image: 'https://image.tmdb.org/t/p/w300/' + obj.poster_path,
      imagemBackgroud: 'https://image.tmdb.org/t/p/original/' + obj.backdrop_path,
      budget: obj.budget,
      tagline: obj.tagline,

      genres: obj.genres
        .map(this.mapearGeneroDoFilme)
        .map((g: generoFilme) => g.name)
        .join(', '),

      video: obj.videos.results.map((v: any) => this.mapearVideoFilme(v)),

      elenco: obj.credits.cast.map(this.mapearElencoDoFilme),

      production_companies: obj.production_companies,

      favorite_movie: this.localStorageService.alreadyFavorito(obj.id),
    };
  }
  private mapearVideoFilme(obj: any): videoFilme {
    return {
      id: obj.id,
      sourceUrl: this.domSanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + obj.key
      )
    };
  }

  private mapearGeneroDoFilme(obj: any): generoFilme {
    return {
      id: obj.id,
      name: obj.name,
    };
  }

  private mapearElencoDoFilme(obj: any): elencoFilme {
    return {
      id: obj.id,
      name: obj.name,
      papel: obj.character,
      image: 'https://image.tmdb.org/t/p/w300' + obj.profile_path,
    };
  }
  public mapearCorDaNota(avaliacaoString: string): string {
    const avaliacao = Number(avaliacaoString);

    if (avaliacao > 0 && avaliacao <= 30) return 'app-borda-nota-mais-baixa';
    else if (avaliacao > 30 && avaliacao <= 50) return 'app-borda-nota-baixa';
    else if (avaliacao > 50 && avaliacao <= 75) return 'app-borda-nota-media';
    else return 'app-borda-nota-alta';
  }
}
