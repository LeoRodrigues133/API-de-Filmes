import { Component } from '@angular/core';
import { detalhamentoDeFilme } from '../../models/detalhamento-de-filme';
import { ActivatedRoute } from '@angular/router';
import { FilmeService } from '../../services/listagem-de-filmes.service';
import { formatDate, NgClass, NgFor, NgIf } from '@angular/common';
import { generoFilme } from '../../models/genero-filme';
import { elencoFilme } from '../../models/elenco-do-filme';
import { DomSanitizer } from '@angular/platform-browser';
import { videoFilme } from '../../models/video-filme';

@Component({
  selector: 'app-detalhamento-de-filmes',
  standalone: true,
  imports: [DetalhamentoDeFilmesComponent, NgClass, NgIf, NgFor],
  templateUrl: './detalhamento-de-filmes.component.html',
  styleUrl: './detalhamento-de-filmes.component.scss',
})
export class DetalhamentoDeFilmesComponent {
  alterarStatusFavorito(detalhes: number) {
    throw new Error('Method not implemented.');
  }
  public detalhes?: detalhamentoDeFilme;

  constructor(
    private route: ActivatedRoute,
    private filmeService: FilmeService,
    private domSanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (!id) {
      throw new Error('Não foi possivel carregar informações sobre o filme.');
    }

    this.filmeService.DetalhamentoDeFilmePorId(id).subscribe((f) => {
      this.detalhes = this.mapearDetalhamentoDeFilme(f);

      console.log(f);
    });
  }

  private mapearDetalhamentoDeFilme(obj: any): detalhamentoDeFilme {
    return {
      id: obj.id,

      title: obj.title,
      sinopse: obj.overview,
      lancamento: formatDate(obj.release_date, 'mediumDate', 'pt-BR'),

      notaEmPorcentagem: (obj.vote_average * 10).toFixed(1),

      image: 'https://image.tmdb.org/t/p/w300/' + obj.poster_path,

      imagemBackgroud:
        'https://image.tmdb.org/t/p/original/' + obj.backdrop_path,

      budget: obj.budget,
      tagline: obj.tagline,

      genres: obj.genres
        .map(this.mapearGeneroDoFilme)
        .map((g: generoFilme) => g.name)
        .join(', '),

      video: obj.videos.results.map((v: any) => this.mapearVideoFilme(v)),

      elenco: obj.credits.cast.map(this.mapearElencoDoFilme),

      production_companies: obj.production_companies,

      homepage: obj.homepage,
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
}
