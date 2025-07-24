import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';
import { ListagemDeFilme } from '../../../models/Listagem-de-Filme';
import { IconeAvaliacaoComponent } from "../icone-avaliacao/icone-avaliacao.component";

@Component({
  selector: 'app-card-de-filmes',
  standalone: true,
  imports: [IconeAvaliacaoComponent, NgIf, RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class CardDeFilmesComponent {
  @Input ({required: true}) filme!: ListagemDeFilme;

}
