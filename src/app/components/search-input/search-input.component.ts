import { Component, EventEmitter, Output } from '@angular/core';
import { ListagemDeFilme } from '../../models/listagem-de-filmes';
import { ResultadoBuscaDeFilmes } from '../../models/busca-de-filmes';
import { formatDate, NgFor } from '@angular/common';
import { FilmeService } from '../../services/api.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [NgFor],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  @Output() buscando = new EventEmitter<{ categoria: string, query: string }>();

  public resultado?: ResultadoBuscaDeFilmes;
  public categorias = [
    { nome: 'Tudo', valor: 'multi' },
    { nome: 'Filmes', valor: 'movie' },
    { nome: 'Atores', valor: 'person' },
    { nome: 'Séries', valor: 'collection' },
  ]

  public categoriaSelecionada: string = this.categorias[0].nome;
  public categoriaSelecionadaValor = this.categorias[0].valor;

  constructor() { }

  public busca(categoria: string, query: string) {
    if (query.length > 0)
      this.buscando.emit({ categoria, query });
  }

}
