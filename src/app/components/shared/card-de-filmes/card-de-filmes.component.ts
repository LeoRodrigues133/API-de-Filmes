import { Component, Input } from '@angular/core';
import { IconeAvaliacaoComponent } from "../icone-avaliacao/icone-avaliacao.component";
import { ListagemDeFilme } from '../../../models/listagem-de-filmes';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-de-filmes',
  standalone: true,
  imports: [IconeAvaliacaoComponent, NgIf, RouterLink],
  templateUrl: './card-de-filmes.component.html',
  styleUrl: './card-de-filmes.component.scss'
})
export class CardDeFilmesComponent {
  @Input ({required: true}) filme!: ListagemDeFilme;

}
