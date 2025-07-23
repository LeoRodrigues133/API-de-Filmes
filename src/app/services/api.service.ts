import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {

  readonly urlApi: string = 'https://api.themoviedb.org/3/';
  linguagem: string = '&language=pt-BR';

  constructor(private http: HttpClient) { }

  public SelectByPopular(page: number = 1, rota: string = 'movie'): Observable<any> {
    const urlCompleto = `${this.urlApi}${rota}/popular?page=${page}${this.linguagem}`;

    return this.http.get<any>(urlCompleto, this.getAuthorizationHeaders());
  }

  public SearchTool(categoria: string = 'multi', query: string, page: number = 1, rota: string = 'search'): Observable<any> {
    const urlCompleto = `${this.urlApi}${rota}/${categoria}?query=${query}&include_adult=false&${this.linguagem}&page=${page}`;
    console.log(urlCompleto);
    return this.http.get<any>(urlCompleto, this.getAuthorizationHeaders());
  }

  public DetailMovieById(id: any, rota: string = 'movie'): Observable<any> {
    const urlCompleto = `${this.urlApi}${rota}/${id}?append_to_response=videos,credits&${this.linguagem}`;

    return this.http.get<any>(urlCompleto, this.getAuthorizationHeaders());
  }

    getAuthorizationHeaders() {
    return {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: environment.API_KEY,
      },
    };
  }
}
