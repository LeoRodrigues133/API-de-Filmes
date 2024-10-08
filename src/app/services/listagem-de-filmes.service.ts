import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  private readonly urlApi: string = 'https://api.themoviedb.org/3/movie';
  private linguagem: string = "&language=pt-BR"
  constructor(private http: HttpClient) {}

  public selecionarFilmesPopulares(page: number): Observable<any> {
    const ulrCompleto = `${this.urlApi}/popular?page=${page}${this.linguagem}`;

    return this.http.get<any>(ulrCompleto, this.getAuthorizationHeaders());
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

  public DetalhamentoDeFilmePorId(id:any): Observable<any>{
    const ulrCompleto = `${this.urlApi}/${id}?append_to_response=videos,credits&${this.linguagem}`;

    return this.http.get<any>(ulrCompleto, this.getAuthorizationHeaders())

  }
}
