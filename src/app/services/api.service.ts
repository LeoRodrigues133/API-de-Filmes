import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  private readonly urlApi: string = 'https://api.themoviedb.org/3/';
  private linguagem: string = '&language=pt-BR';
  private rota: string = '';
  constructor(private http: HttpClient) {}

  public selecionarFilmesPopulares(page: number): Observable<any> {
    this.rota = 'movie';
    const urlCompleto = `${this.urlApi}${this.rota}/popular?page=${page}${this.linguagem}`;

    return this.http.get<any>(urlCompleto, this.getAuthorizationHeaders());
  }

  private getAuthorizationHeaders() {
    return {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: environment.API_KEY,
      },
    };
  }

  public ferramentaDeBusca(
    categoria: string = 'multi',
    query: string,
    page: number = 1
  ): Observable<any> {
    this.rota = 'search';
    const urlCompleto = `${this.urlApi}${this.rota}/${categoria}?query=${query}&include_adult=false&${this.linguagem}&page=${page}`;

    return this.http.get<any>(urlCompleto, this.getAuthorizationHeaders());
  }

  public detalhamentoDeFilmePorId(id: any): Observable<any> {
    const urlCompleto = `${this.urlApi}${this.rota}/${id}?append_to_response=videos,credits&${this.linguagem}`;

    return this.http.get<any>(urlCompleto, this.getAuthorizationHeaders());
  }
}
